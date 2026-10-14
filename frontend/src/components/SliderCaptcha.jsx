import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Check, ArrowRight } from "lucide-react";

import buildingImg from "../assets/CaptchaImages/building.jpg";
import calculatorImg from "../assets/CaptchaImages/calculator.jpg";
import houseImg from "../assets/CaptchaImages/house.jpg";
import keyImg from "../assets/CaptchaImages/key.jpg";
import oceanImg from "../assets/CaptchaImages/ocean.jpg";

const IMAGE_POOL = [buildingImg, calculatorImg, houseImg, keyImg, oceanImg];

// Puzzle geometry, in a fixed internal coordinate space. The board is
// drawn at BOARD_WIDTH x BOARD_HEIGHT on an offscreen-scale canvas and
// then stretched to fill whatever width the container actually has, so
// dragging math and drawing math both work in these same units.
const BOARD_WIDTH = 320;
const BOARD_HEIGHT = 170;
const PIECE_SIZE = 46; // square core of the piece, excluding the knob
const KNOB_RADIUS = 9;
const PIECE_MARGIN = KNOB_RADIUS + 3; // padding around the piece bitmap
const PIECE_CANVAS_SIZE = PIECE_SIZE + PIECE_MARGIN * 2;
const SUCCESS_TOLERANCE = 6; // px, in board coordinate space
const HANDLE_SIZE = 44; // px, the round slider handle

/**
 * Builds a jigsaw-piece Path2D at the given top-left (x, y), sized
 * PIECE_SIZE, with a knob bump on the top edge and a socket notch on
 * the left edge — a classic interlocking puzzle-piece silhouette.
 */
function buildPiecePath(x, y) {
  const s = PIECE_SIZE;
  const r = KNOB_RADIUS;
  const path = new Path2D();

  path.moveTo(x, y);
  path.lineTo(x + s * 0.38, y);
  path.arc(x + s * 0.55, y, r, Math.PI, 0, true);
  path.lineTo(x + s, y);
  path.lineTo(x + s, y + s);
  path.lineTo(x, y + s);
  path.lineTo(x, y + s * 0.62);
  path.arc(x, y + s * 0.45, r, Math.PI * 0.5, Math.PI * 1.5, true);
  path.lineTo(x, y);
  path.closePath();

  return path;
}

/**
 * SliderCaptcha (checkbox + image puzzle variant)
 *
 * Presents as a compact "I'm not a robot" style checkbox by default.
 * Clicking it expands an image puzzle: a jigsaw-shaped notch is
 * punched out of a random background photo, and the matching piece
 * floats at the left edge. Dragging the slider moves the piece
 * horizontally; verification succeeds once it's released close enough
 * to the notch's original position, at which point the puzzle
 * collapses back down and the checkbox shows a "Verified" state.
 *
 * This is a client-side friction/UX control, not a cryptographic
 * guarantee — pair with server-side validation for anything where bot
 * traffic is a real concern.
 *
 * Props:
 *  - onVerify(verified: boolean): called whenever verification state changes
 *  - disabled: disables interaction (e.g. while the form is submitting)
 *  - resetSignal: change this value to force a fresh puzzle + collapse back
 *                 to the unchecked checkbox state (e.g. after a submit)
 */
export default function SliderCaptcha({ onVerify, disabled = false, resetSignal }) {
  const boardCanvasRef = useRef(null); // background image with the notch cut out
  const pieceCanvasRef = useRef(null); // the floating puzzle piece bitmap
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const handlePosRef = useRef(0);

  const [imgSrc, setImgSrc] = useState(() => IMAGE_POOL[Math.floor(Math.random() * IMAGE_POOL.length)]);
  const [attempt, setAttempt] = useState(0); // bump to regenerate the puzzle
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false); // whether the puzzle panel is open
  const [containerWidth, setContainerWidth] = useState(BOARD_WIDTH);
  const [handlePos, setHandlePos] = useState(0); // px along the slider rail
  const [verified, setVerified] = useState(false);
  const [shake, setShake] = useState(false);
  const [puzzle, setPuzzle] = useState(() => ({
    x: PIECE_SIZE + 30 + Math.random() * (BOARD_WIDTH - PIECE_SIZE * 2 - 60),
    y: 16 + Math.random() * (BOARD_HEIGHT - PIECE_SIZE - 32),
  }));

  // Roll a fresh image + notch position whenever a new attempt starts
  // (i.e. the reset button was clicked). Random number generation is
  // side-effectful, so it happens here (in an effect, in response to
  // `attempt` changing) rather than during render.
  useEffect(() => {
    if (attempt === 0) return; // initial image/puzzle already set via useState above

    setImgSrc((current) => {
      if (IMAGE_POOL.length <= 1) return current;
      let next = current;
      while (next === current) {
        next = IMAGE_POOL[Math.floor(Math.random() * IMAGE_POOL.length)];
      }
      return next;
    });

    setPuzzle({
      x: PIECE_SIZE + 30 + Math.random() * (BOARD_WIDTH - PIECE_SIZE * 2 - 60),
      y: 16 + Math.random() * (BOARD_HEIGHT - PIECE_SIZE - 32),
    });
  }, [attempt]);

  const railWidth = Math.max(containerWidth, 1);
  const maxHandlePos = Math.max(railWidth - HANDLE_SIZE, 0);
  const scale = containerWidth / BOARD_WIDTH; // CSS px per board unit

  // Load the current source image.
  useEffect(() => {
    setReady(false);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setReady(true);
    };
    img.src = imgSrc;
  }, [imgSrc]);

  // Draw the board (with notch punched out) and the extracted piece bitmap.
  const draw = useCallback(() => {
    const board = boardCanvasRef.current;
    const piece = pieceCanvasRef.current;
    const img = imgRef.current;
    if (!board || !piece || !img) return;

    const bctx = board.getContext("2d");
    const pctx = piece.getContext("2d");

    board.width = BOARD_WIDTH;
    board.height = BOARD_HEIGHT;
    piece.width = PIECE_CANVAS_SIZE;
    piece.height = PIECE_CANVAS_SIZE;

    bctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    bctx.drawImage(img, 0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    const { x, y } = puzzle;

    // Extract the piece bitmap from the untouched image, offset into
    // the small square piece canvas.
    pctx.clearRect(0, 0, PIECE_CANVAS_SIZE, PIECE_CANVAS_SIZE);
    pctx.save();
    const localPath = buildPiecePath(PIECE_MARGIN, PIECE_MARGIN);
    pctx.clip(localPath);
    pctx.drawImage(img, PIECE_MARGIN - x, PIECE_MARGIN - y, BOARD_WIDTH, BOARD_HEIGHT);
    pctx.restore();
    pctx.save();
    pctx.strokeStyle = "rgba(255,255,255,0.9)";
    pctx.lineWidth = 2;
    pctx.stroke(localPath);
    pctx.restore();

    // Punch the matching notch out of the board: darken + outline it.
    const boardPath = buildPiecePath(x, y);
    bctx.save();
    bctx.fillStyle = "rgba(10, 15, 30, 0.55)";
    bctx.fill(boardPath);
    bctx.strokeStyle = "rgba(255,255,255,0.85)";
    bctx.lineWidth = 2;
    bctx.stroke(boardPath);
    bctx.restore();
  }, [puzzle]);

  useEffect(() => {
    if (ready && expanded) draw();
  }, [ready, expanded, draw]);

  // Track container width so board-space pixels can be scaled to CSS pixels.
  const measure = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth || BOARD_WIDTH);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, expanded]);

  useEffect(() => {
    handlePosRef.current = handlePos;
  }, [handlePos]);

  const regenerate = useCallback(() => {
    setHandlePos(0);
    setVerified(false);
    setAttempt((a) => a + 1);
    onVerify?.(false);
  }, [onVerify]);

  // Parent-forced reset: collapse back to the unchecked checkbox and
  // roll a fresh puzzle for next time (e.g. after a successful submit).
  useEffect(() => {
    if (resetSignal !== undefined) {
      setExpanded(false);
      regenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  const openPuzzle = useCallback(() => {
    if (disabled || verified) return;
    setExpanded(true);
  }, [disabled, verified]);

  // Piece's current left position, in board units, derived from the
  // slider handle's travel percentage.
  const pieceBoardX = useMemo(() => {
    if (maxHandlePos <= 0) return 0;
    const travel = BOARD_WIDTH - PIECE_SIZE; // how far the piece can move right
    const pct = handlePos / maxHandlePos;
    return pct * travel;
  }, [handlePos, maxHandlePos]);

  const finishDrag = useCallback(
    (finalHandlePos) => {
      draggingRef.current = false;
      document.body.style.userSelect = "";

      if (maxHandlePos <= 0) return;
      const travel = BOARD_WIDTH - PIECE_SIZE;
      const pct = finalHandlePos / maxHandlePos;
      const finalPieceX = pct * travel;

      if (Math.abs(finalPieceX - puzzle.x) <= SUCCESS_TOLERANCE) {
        setHandlePos(finalHandlePos);
        setVerified(true);
        onVerify?.(true);
        // Let the "Verified" state flash briefly inside the puzzle
        // before collapsing back down to the checkbox.
        setTimeout(() => setExpanded(false), 700);
      } else {
        setHandlePos(0);
        setVerified(false);
        onVerify?.(false);
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    },
    [maxHandlePos, puzzle.x, onVerify]
  );

  const handlePointerMove = useCallback(
    (clientX) => {
      if (!draggingRef.current) return;
      const delta = clientX - startXRef.current;
      const next = Math.min(Math.max(delta, 0), maxHandlePos);
      setHandlePos(next);
    },
    [maxHandlePos]
  );

  const startDrag = (clientX) => {
    if (disabled || verified) return;
    measure();
    draggingRef.current = true;
    startXRef.current = clientX - handlePos;
    document.body.style.userSelect = "none";
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    startDrag(e.clientX);

    const onMove = (ev) => handlePointerMove(ev.clientX);
    const onUp = () => {
      if (draggingRef.current) finishDrag(handlePosRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleTouchStart = (e) => {
    if (e.touches?.[0]) startDrag(e.touches[0].clientX);

    const onMove = (ev) => {
      if (ev.touches?.[0]) handlePointerMove(ev.touches[0].clientX);
    };
    const onEnd = () => {
      if (draggingRef.current) finishDrag(handlePosRef.current);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };

    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
  };

  const handleKeyDown = (e) => {
    if (disabled || verified) return;
    if (e.key === "ArrowRight") {
      setHandlePos((p) => Math.min(p + 8, maxHandlePos));
    } else if (e.key === "ArrowLeft") {
      setHandlePos((p) => Math.max(p - 8, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      finishDrag(handlePos);
    }
  };

  // CSS px positions for the floating piece overlay.
  const pieceLeftPx = (pieceBoardX - PIECE_MARGIN) * scale;
  const pieceTopPx = (puzzle.y - PIECE_MARGIN) * scale;
  const pieceSidePx = PIECE_CANVAS_SIZE * scale;

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-(--foreground)/70">
        Verification
      </label>

      {!expanded ? (
        <button
          type="button"
          onClick={openPuzzle}
          disabled={disabled}
          aria-pressed={verified}
          className={[
            "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition",
            verified
              ? "border-(--teal) bg-(--teal)/10 text-(--foreground)"
              : "border-(--border) bg-(--background) text-(--foreground) hover:border-(--coral)/50",
            disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          ].join(" ")}
        >
          <span
            className={[
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
              verified
                ? "border-(--teal) bg-(--teal) text-white"
                : "border-(--border) bg-(--card)",
            ].join(" ")}
          >
            {verified && <Check className="h-4 w-4" strokeWidth={3} />}
          </span>

          <span className="font-medium">
            {verified ? "Verified — you're not a robot" : "I'm not a robot"}
          </span>
        </button>
      ) : (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-(--muted-foreground)">
              Drag the piece to complete the puzzle
            </span>
            <button
              type="button"
              onClick={regenerate}
              disabled={disabled}
              aria-label="Get a new puzzle"
              className="text-(--muted-foreground) transition hover:text-(--foreground) disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div
            ref={containerRef}
            className={[
              "relative w-full overflow-hidden rounded-xl border border-(--border) bg-(--muted)",
              shake ? "animate-[captcha-shake_0.4s_ease-in-out]" : "",
              disabled ? "pointer-events-none opacity-60" : "",
            ].join(" ")}
            style={{ aspectRatio: `${BOARD_WIDTH} / ${BOARD_HEIGHT}` }}
          >
            <canvas ref={boardCanvasRef} className="absolute inset-0 h-full w-full" />

            <canvas
              ref={pieceCanvasRef}
              className="pointer-events-none absolute"
              style={{
                left: `${pieceLeftPx}px`,
                top: `${pieceTopPx}px`,
                width: `${pieceSidePx}px`,
                height: `${pieceSidePx}px`,
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))",
              }}
            />

            {verified && (
              <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-(--teal) px-2.5 py-1 text-xs font-medium text-white shadow-soft">
                <Check className="h-3 w-3" strokeWidth={3} />
                Verified
              </div>
            )}

            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-(--muted-foreground)">
                Loading puzzle…
              </div>
            )}
          </div>

          {/* Slider rail control */}
          <div className="relative mt-3 h-11 w-full select-none overflow-hidden rounded-full bg-(--muted)">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-(--teal)/30 transition-[width]"
              style={{ width: `${handlePos + HANDLE_SIZE / 2}px` }}
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-medium text-(--muted-foreground)"
              style={{ opacity: verified || handlePos > 0 ? 0 : 1 }}
            >
              Slide to verify
            </div>

            <div
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-label="Slide to move the puzzle piece into place"
              aria-valuenow={maxHandlePos > 0 ? Math.round((handlePos / maxHandlePos) * 100) : 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-disabled={disabled}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onKeyDown={handleKeyDown}
              className={[
                "absolute top-0 left-0 flex h-11 w-11 cursor-grab items-center justify-center rounded-full shadow-soft outline-none transition-colors active:cursor-grabbing",
                "focus-visible:ring-2 focus-visible:ring-(--coral)/50",
                verified ? "bg-(--teal) text-white" : "bg-(--card) text-(--foreground) border border-(--border)",
              ].join(" ")}
              style={{ transform: `translateX(${handlePos}px)` }}
            >
              {verified ? <Check className="h-5 w-5" strokeWidth={3} /> : <ArrowRight className="h-5 w-5" />}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes captcha-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}