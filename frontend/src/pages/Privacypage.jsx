import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import Footer from "../components/Footer";

const Privacypage = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.getElementById(hash.replace("#", ""));
            if (el) {
                // slight delay lets the page finish laying out before we scroll
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [hash]);

    return (
        <main>
            <Navbar />

            <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">

                {/* Hero */}
                <section className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-4xl bg-grad-warm py-14 shadow-soft">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-20 -left-16 h-52 w-52 rounded-full bg-white/30 blur-3xl" />
                        <div className="absolute -bottom-20 -right-16 h-60 w-60 rounded-full bg-(--coral)/20 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-3xl px-6 text-center">

                        <h1 className="mt-5 font-display text-4xl md:text-5xl">
                            Privacy Notice
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-(--primary)/80">
                            Your privacy matters to us. This notice explains how we collect,
                            use, protect and store your information.
                        </p>

                        <p className="mt-5 text-sm text-(--primary)/70">
                            Last Updated • July 13, 2026
                        </p>
                    </div>
                </section>

                {/* Cards */}
                <div className="mt-20 space-y-8">

                    {/* Introduction */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Introduction</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            Zuari Insurance brokers Limited ("Company," "We," "Us," or "Our") is committed to protecting
                            the privacy and security of your personal information. We take your concerns
                            seriously, and we will periodically update this Privacy Notice to reflect
                            changes in our data practices or applicable law.
                        </p>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            This Privacy Notice applies to Zuari Insurance brokers Limited and its subsidiary, associate,
                            and affiliate companies (the "Zuari Insurance brokers Limited Group").
                        </p>
                    </div>

                    {/* Interpretation and Definitions */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Interpretation and Definitions</h2>
                        <ul className="mt-6 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Company</strong> refers to Zuari Insurance brokers Limited, registered at [Registered Office Address].</li>
                            <li><strong>Service</strong> refers to the Company's services accessible via our website and mobile applications.</li>
                            <li><strong>Personal Data</strong> means any information relating to an identified or identifiable individual.</li>
                            <li><strong>Data Subject / Data Principal</strong> is any living individual who is the subject of Personal Data.</li>
                            <li><strong>Data Controller / Data Fiduciary</strong> determines the purposes and means of processing Personal Data.</li>
                            <li><strong>Data Processor</strong> processes Personal Data on behalf of the Data Controller.</li>
                            <li><strong>Cookies</strong> are small files stored on your device.</li>
                            <li><strong>Affiliate</strong> means an entity under common control with a party (50%+ ownership or voting control).</li>
                            <li><strong>Country</strong> refers to India.</li>
                            <li><strong>Application/Platform</strong> means the software provided by the Company, named "[App Name]."</li>
                            <li><strong>You</strong> means the individual (or entity) accessing or using the Service.</li>
                        </ul>
                    </div>

                    {/* Data Protection Officer */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Data Protection Officer</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            Zuari Insurance brokers Limited has appointed an internal Data Protection Officer (DPO) to
                            address inquiries or concerns regarding our personal data practices.
                        </p>
                        <ul className="mt-6 space-y-2 text-(--muted-foreground)">
                            <li><strong>Name:</strong> [DPO Name]</li>
                            <li><strong>Email:</strong> [dpo@yourcompany.com]</li>
                        </ul>
                    </div>

                    {/* Information We Collect */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Information We Collect</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            We collect the following categories of personal information, some of which
                            apply only to the services you've subscribed to:
                        </p>
                        <ul className="mt-6 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>User Information:</strong> Email, full name, display name, date of birth, gender, profile photo, city, pincode, blood group, contact number(s), address, nominee details.</li>
                            <li><strong>Dependent Information:</strong> Name, date of birth, gender, relation.</li>
                            <li><strong>Nominee Details:</strong> Name, relation, contact number, email, pincode.</li>
                            <li><strong>Medical Information:</strong> Checkup results, diagnosis details, medical bills/reports, hospitalization details, doctor name, government ID documents, bank details, UHID.</li>
                            <li><strong>Contact Information:</strong> Email, name, contact number.</li>
                            <li><strong>Mobile App Permissions:</strong> Camera, location, notifications, photos.</li>
                            <li><strong>Partner Integration Data:</strong> Name, email, contact number, date of birth, city, gender.</li>
                            <li><strong>Activity/Health Data:</strong> Step count or similar wellness data (e.g., via Google Health Connect), collected with your explicit consent.</li>
                        </ul>
                    </div>

                    {/* How We Use Your Information */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">How We Use Your Information</h2>
                        <ul className="mt-6 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li>Provide insurance and/or wellness services to you and your dependents</li>
                            <li>Manage policies, claims, and related documentation</li>
                            <li>Facilitate health check-ups, hospitalization claims, and partner integrations</li>
                            <li>Enable app features such as profile updates, network listings, location services, notifications, and document uploads</li>
                            <li>Send service communications, reminders, and updates</li>
                            <li>Display activity logs and support engagement features like leaderboards, where opted in</li>
                            <li>Verify your identity and comply with legal or regulatory obligations</li>
                        </ul>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            We do not sell personal information. We only share it with third parties
                            who help us deliver our services.
                        </p>
                    </div>

                    {/* How We Collect Information */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">How We Collect Your Information</h2>
                        <ul className="mt-6 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Directly from you:</strong> during onboarding, through forms, or via our app.</li>
                            <li><strong>Via your organization:</strong> if your employer enrolls you in our services.</li>
                            <li><strong>From partners:</strong> wellness or technology partners integrated with our Service.</li>
                            <li><strong>From event registrations:</strong> if you register for content or events via third-party platforms.</li>
                            <li><strong>From connected health platforms:</strong> such as Google Health Connect, with your explicit consent.</li>
                        </ul>
                    </div>

                    {/* Website Use, Cookies & Analytics */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Use of Our Website</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            Like most websites, we automatically collect certain information — IP
                            address, general location, browser type, operating system, and usage
                            patterns — to improve site design, diagnose issues, and understand visitor
                            preferences.
                        </p>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            We use analytics tools (e.g., Google Analytics and similar providers) strictly
                            to improve the user experience; this data is not used beyond that scope. Our
                            Cookie Notice explains the cookies we use and how you can manage your
                            preferences. We do not currently respond to Do Not Track (DNT) signals, as we
                            do not serve targeted advertising.
                        </p>
                    </div>

                    {/* Data Sharing */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">When and How We Share Information</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            Your personal information is stored securely with our cloud infrastructure
                            provider. We do not disclose your personal data to third parties for their
                            independent use, except where:
                        </p>
                        <ul className="mt-6 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li>You request or authorize it</li>
                            <li>It supports a Company-hosted or co-sponsored event or program</li>
                            <li>It confirms benefit receipt or usage to your employer</li>
                            <li>It's required to comply with law, enforce an agreement, or protect rights and safety</li>
                            <li>It's shared with our agents, vendors, or service providers performing functions on our behalf</li>
                            <li>It addresses emergencies, disputes, or claims</li>
                        </ul>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            We may share aggregated, non-identifiable data with partners for marketing or
                            promotional insights. [Confirm: does your company do this — adjust as needed.]
                        </p>
                    </div>

                    {/* Social Media Integration */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Social Media Integration</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            Our website may interface with social platforms such as LinkedIn, Twitter/X,
                            YouTube, and Instagram. If you interact with these features, please review
                            the respective platform's privacy policy, as they may link your visit to your
                            personal data on that platform.
                        </p>
                        <ul className="mt-6 space-y-2 text-(--muted-foreground)">
                            <li>LinkedIn: <a href="https://www.linkedin.com/company/zuari-insurance-brokers-ltd/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer">Zuari Insurance Brokers Limited</a></li>
                            <li>Twitter/X: <a href="" target="_blank" rel="noopener noreferrer">Zuari Insurance</a></li>
                            <li>Instagram: <a href="" target="_blank" rel="noopener noreferrer">Zuari Insurance</a></li>
                        </ul>
                    </div>

                    {/* International Transfer */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Transferring Personal Data</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            Zuari Insurance Brokers Limited is headquartered in Delhi, India, and processes information
                            within India. Where data processors are engaged, we use data processing
                            agreements and appropriate contractual safeguards, and require compliance
                            with applicable data protection laws.
                        </p>
                    </div>

                    {/* Data Subject / Data Principal Rights */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Your Privacy Rights</h2>

                        <h3 className="mt-6 font-display text-xl">Under India's DPDP Act, 2023</h3>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            As per the DPDP Act, 2023, data subjects, referred to as Data Principals,
                            have the following rights:
                        </p>

                        <p className="mt-6 font-semibold text-(--primary)">1. Right to Information (Section 11)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Summary of Personal Data:</strong> obtain a summary of the personal data being processed and the processing activities undertaken.</li>
                            <li><strong>Identities of Data Fiduciaries and Processors:</strong> obtain information about all other Data Fiduciaries and Data Processors with whom the personal data has been shared.</li>
                            <li><strong>Additional Information:</strong> request any other prescribed information related to the personal data and its processing.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">2. Right to Correction and Erasure (Section 12)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Correction:</strong> request the correction of inaccurate or misleading personal data.</li>
                            <li><strong>Completion and Updating:</strong> request the completion of incomplete personal data and updating of personal data.</li>
                            <li><strong>Erasure:</strong> request the erasure of personal data unless retention is necessary for compliance with law or for the specified purpose.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">3. Right to Grievance Redressal (Section 13)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Grievance Redressal:</strong> have readily available means for grievance redressal in case of any issues related to personal data processing.</li>
                            <li><strong>Response Time:</strong> Data Fiduciaries must respond to grievances within a prescribed period.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">4. Right to Nominate (Section 14)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Nomination:</strong> nominate another individual to exercise rights on behalf of the Data Principal in case of death or incapacity.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">5. Duties of Data Principals (Section 15)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Compliance with Laws:</strong> ensure compliance with applicable laws while exercising rights.</li>
                            <li><strong>Authenticity:</strong> provide verifiable authentic information and avoid impersonation or suppression of material information.</li>
                        </ul>

                        <h3 className="mt-6 font-display text-xl">Under GDPR (if applicable to EU data subjects)</h3>
                        <ul className="mt-4 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Right to Access:</strong> confirm and access what data we hold about you.</li>
                            <li><strong>Right to Rectification:</strong> correct or complete inaccurate data.</li>
                            <li><strong>Right to Erasure:</strong> request deletion where applicable.</li>
                            <li><strong>Right to Restrict Processing:</strong> limit processing under certain conditions.</li>
                            <li><strong>Right to Data Portability:</strong> receive your data in a portable format.</li>
                            <li><strong>Right to Object:</strong> object to processing for legitimate interest, marketing, or research.</li>
                            <li><strong>Automated Decision-Making:</strong> challenge decisions made solely by automated means.</li>
                            <li><strong>Right to Lodge a Complaint:</strong> with your local data protection authority.</li>
                        </ul>

                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            To exercise any of these rights, contact us at [dpo@yourcompany.com].
                        </p>
                        <h3 className="mt-6 font-display text-xl">Under the General Data Protection Regulation (GDPR) (European Union)</h3>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            As per the GDPR, data subjects have the following rights:
                        </p>

                        <p className="mt-6 font-semibold text-(--primary)">1. Right to Information and Access (Articles 12 - 15)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Information to be Provided:</strong> understand what personal data is collected, the purposes of processing, and who will receive the data.</li>
                            <li><strong>Access to Data:</strong> confirm whether personal data is being processed and access the personal data held by the controller.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">2. Right to Rectification (Article 16)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Correction of Data:</strong> correct inaccurate personal data and complete incomplete data.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">3. Right to Erasure (Article 17)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Erasure of Data:</strong> request the deletion of personal data when it is no longer necessary, consent is withdrawn, or if processing is unlawful.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">4. Right to Restriction of Processing (Article 18)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Restrict Processing:</strong> limit processing of personal data under certain circumstances.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">5. Right to Data Portability (Article 20)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Data Portability:</strong> receive personal data in a structured, commonly used format and transmit it to another controller.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">6. Right to Object (Article 21)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Objection:</strong> object to processing based on legitimate interests, direct marketing, or processing for research or statistical purposes.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">7. Automated Decision-Making (Article 22)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Restrictions:</strong> challenge automated decisions, including profiling, that produce legal effects or significantly affect them.</li>
                        </ul>

                        <p className="mt-6 font-semibold text-(--primary)">8. Right to Lodge a Complaint (Article 77)</p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Complaint:</strong> lodge a complaint with the appropriate data protection authority if you have concerns about how your data is processed.</li>
                        </ul>

                        <h3 className="mt-6 font-display text-xl">How to Exercise Your Rights</h3>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            To exercise any of these rights, you may contact us at [dpo@yourcompany.com].
                            We will respond to your requests in accordance with applicable laws and
                            within the prescribed time frames.
                        </p>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            For more information or if you have any questions, please contact us at
                            [dpo@yourcompany.com].
                        </p>
                    </div>

                    {/* Security */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Security of Your Information</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            At  Zuari Insurance Brokers Limited, we are committed to ensuring the security and
                            confidentiality of your personal data. We have implemented a robust
                            Information Security Management System (ISMS) based on the ISO 27001:2022
                            standard, designed to protect your data from unauthorized access and other
                            threats.
                        </p>
                        <p className="mt-4 leading-8 text-(--muted-foreground)">
                            For more detailed information about our security practices, please visit our
                            dedicated security page: [security page link].
                        </p>

                        <h3 className="mt-6 font-display text-xl">Key Security Measures</h3>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Encryption:</strong> we use HTTPS with TLS 1.2 and 1.3 for secure data transmission and AES-256 encryption for data at rest.</li>
                            <li><strong>Access Controls:</strong> strict access controls ensure that only authorized personnel can access your data.</li>
                            <li><strong>Regular Testing and Audits:</strong> we conduct annual penetration testing, continuous monitoring, and quarterly audits to identify and mitigate vulnerabilities.</li>
                        </ul>

                        <h3 className="mt-6 font-display text-xl">Employee Training and Accountability</h3>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Comprehensive Training:</strong> all employees undergo security training during onboarding and receive annual refresher courses.</li>
                            <li><strong>Continuous Development:</strong> our security team stays updated with the latest security methods and tools through ongoing training.</li>
                            <li><strong>Disciplinary Measures:</strong> we enforce strict disciplinary measures for any violations of our security policies to ensure accountability.</li>
                        </ul>

                        <h3 className="mt-6 font-display text-xl">Certifications</h3>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li> Zuari Insurance Brokers Limited is ISO 27001:2022 and SOC 2 Type 2 certified, demonstrating our adherence to the highest standards of information security.</li>
                        </ul>
                    </div>

                    {/* Data Retention */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Data Retention Guidelines</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            At  Zuari Insurance Brokers Limited, we adhere to strict data retention guidelines to ensure
                            compliance with regulatory requirements and to protect the privacy and
                            security of personal data. Our retention policies are informed by the
                            Insurance Regulatory and Development Authority of India (IRDAI) guidelines
                            and industry best practices.
                        </p>

                        <h3 className="mt-6 font-display text-xl">IRDAI Retention Requirements</h3>
                        <p className="mt-3 leading-8 text-(--muted-foreground)">
                            In compliance with the Insurance Regulatory and Development Authority of
                            India (Minimum Information Required for Investigation and Inspection)
                            Regulations, 2020, we maintain the following records:
                        </p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Policy Records:</strong> includes details such as the name and address of the policyholder, the date when the policy was effected, and records of any transfers, assignments, or nominations.</li>
                            <li><strong>Claims Records:</strong> includes information about every claim made, the date of the claim, the name and address of the claimant, and the date on which the claim was discharged or rejected, along with the grounds for rejection.</li>
                        </ul>
                        <p className="mt-3 leading-8 text-(--muted-foreground)">
                            These records can be maintained in both physical and electronic forms. Our
                            board-approved policy ensures that these records are managed and stored
                            securely, addressing aspects like accessibility, security, archival, disaster
                            recovery, and business continuity.
                        </p>

                        <h3 className="mt-6 font-display text-xl">Data Retention Periods</h3>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Policy Records:</strong> retained for a minimum of ten years from the date of policy maturity, surrender, or lapse.</li>
                            <li><strong>Claims Records:</strong> retained for a minimum of ten years from the date of claim settlement or rejection.</li>
                            <li><strong>Personally Identifiable Data (not falling under "Policy Records" and "Claims Records"):</strong> retained for a period of 12 months after the services have been canceled.</li>
                            <li><strong>Wellness Services Data Records:</strong> if opted in, data would be retained for a period of 12 months after the termination of the service.</li>
                            <li><strong>Retention of Step Count Data:</strong> we retain step count data for as long as the user remains active in the application. If the user or their organization discontinues using the service, the data will be retained until a deletion request is made. Users can request the deletion of their data at any time by contacting us at [privacy@yourcompany.com].</li>
                        </ul>

                        <h3 className="mt-6 font-display text-xl">Electronic Records Management</h3>
                        <p className="mt-3 leading-8 text-(--muted-foreground)">
                            Our electronic records management system complies with the IRDAI regulations
                            and includes:
                        </p>
                        <ul className="mt-3 space-y-3 list-disc pl-6 text-(--muted-foreground)">
                            <li><strong>Processing and Maintenance:</strong> efficient electronic maintenance of records to ensure easy retrieval and round-the-clock accessibility.</li>
                            <li><strong>Privacy and Security:</strong> implementation of robust privacy and security measures to protect policyholder data.</li>
                            <li><strong>Virus and Vulnerability Handling:</strong> procedures to address and mitigate virus and vulnerability issues.</li>
                            <li><strong>Hardware and Software Security:</strong> secure management of hardware and software resources.</li>
                            <li><strong>Backups and Disaster Recovery:</strong> regular backups and a comprehensive disaster recovery plan to ensure data integrity and availability.</li>
                            <li><strong>Data Archival:</strong> long-term storage solutions for archived data.</li>
                        </ul>

                        <h3 className="mt-6 font-display text-xl">Annual Review and Compliance</h3>
                        <p className="mt-3 leading-8 text-(--muted-foreground)">
                            Our data retention policy is reviewed annually and overseen by our senior
                            management to ensure compliance with regulatory requirements and to address
                            evolving business needs. The review is conducted within 90 days from the end
                            of each financial year.
                        </p>
                        <p className="mt-3 leading-8 text-(--muted-foreground)">
                            All records, including those maintained electronically, are stored in data
                            centers located within India, ensuring compliance with local regulatory
                            requirements.
                        </p>
                        <p className="mt-3 leading-8 text-(--muted-foreground)">
                            For more detailed information about our data retention and security
                            practices, please visit our dedicated InfoSec page: [InfoSec page link].
                        </p>
                    </div>

                    {/* Account Deletion */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Account Deletion</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            You may request account deletion at any time by contacting our Data
                            Protection Officer at [dpo@yourcompany.com]. After identity verification, we
                            will process your request within a reasonable time frame. Some data may be
                            retained where required for legal or regulatory compliance, as described in
                            our Data Retention Guidelines.
                        </p>
                        <p>Please note that some data may be retained for legal compliance purposes or as
                            required for legitimate business purposes, in accordance with our Data Retention
                            Guidelines  mentioned above.</p>
                    </div>

                    {/* Grievance Redressal */}
                    <div id="grievance-redressal" className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft scroll-mt-24">
                        <h2 className="font-display text-3xl">Grievance Redressal</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            If you have concerns about how your personal data is processed, please
                            contact our Data Protection Officer:
                        </p>
                        <ul className="mt-6 space-y-2 text-(--muted-foreground)">
                            <li><strong>Name:</strong> [DPO Name]</li>
                            <li><strong>Email:</strong> [dpo@yourcompany.com]</li>
                        </ul>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            We will acknowledge and address your complaint promptly in accordance with applicable laws and regulations.
                        </p>
                    </div>

                    {/* Governing Law */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Governing Law</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            This Privacy Notice and any disputes related to it shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Delhi, India to resolve any legal matter arising from the Privacy Notice.
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Disclaimer</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            Zuari Insurance aims to keep your Personal Data secure and up to date, but we cannot guarantee the absolute security of your data transmitted to our site or mobile applications. Any transmission of data is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the website.
                        </p>
                    </div>

                    {/* Amendments */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Amendments to This Notice</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            We may update this Privacy Notice periodically. Changes take effect once
                            posted here, so please check back from time to time.
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div className="rounded-4xl border border-(--border)/60 bg-(--card) p-10 shadow-soft">
                        <h2 className="font-display text-3xl">Contact Us</h2>
                        <p className="mt-6 leading-8 text-(--muted-foreground)">
                            For questions, concerns, or to exercise your data rights, please reach our
                            Data Protection Officer:
                        </p>
                        <ul className="mt-6 space-y-2 text-(--muted-foreground)">
                            <li><strong>Name:</strong> [DPO Name]</li>
                            <li><strong>Company:</strong> Zuari Insurance brokers Limited</li>
                            <li><strong>Address:</strong> A-32, First Floor, Mohan Cooperative Industrial Estate Mathura Road, Badarpur, New Delhi-110044</li>
                            <li><strong>Email:</strong> [dpo@yourcompany.com]</li>
                        </ul>
                        <p className="mt-6 leading-8 text-(--muted-foreground) text-sm">
                            Note: Insurance products are offered and serviced by Zuari Insurance Brokers Limited |
                            CIN U66010HR2003PLC137044 | IRDAI Broking License Registration Code: 318 | License
                            category: Direct (Life & General) | License validity: 12-12-2026.
                        </p>
                    </div>

                </div>

            </section>

            <Footer />
        </main>
    );
}


export default Privacypage

