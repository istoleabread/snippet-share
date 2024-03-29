import logo from "./assets/snippetSphere.svg";
import snippets from "./assets/snippets.svg";
import ellipse from "./assets/Ellipse.svg";
import revolution from "./assets/revolutionize.svg";
import phone from "./assets/mobile.svg";
import styles from "./styles/homepage.module.css";
import featureStyles from "./styles/features.module.css";
import lastStyles from "./styles/landingpageLast.module.css";
import footerStyles from "./styles/footer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faReact, faSnapchat } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
    const navigator = useNavigate();

    return (
        <div className={styles.all}>
            <section className={styles.mainPage}>
                <header className={styles.header}>
                    <div className={styles.nameLogo}>
                        <img src={logo} alt="err" width={"150px"} height={"auto"} />
                        <h1>Snippet Sphere</h1>
                    </div>

                    <div className={styles.allLinks}>
                        <a href="#about">About</a>
                        <a href="#features">Features</a>
                        <button
                            type="button"
                            onClick={() => {
                                navigator("/signup");
                            }}
                        >
                            Sign up
                        </button>
                    </div>

                    <div className={styles.login}>
                        <button
                            type="button"
                            onClick={() => {
                                navigator("/login");
                            }}
                        >
                            Login
                        </button>
                    </div>
                </header>

                <div className={styles.snippetDesc}>
                    <HomeContent />
                    <HomeImage1 />


                </div>
                <div className={styles.stylingDiv}>
                    <img src={ellipse} alt="" />
                </div>
            </section>

            <section className={styles.about} id="about">
                <h1>Revolutionizing Code Sharing</h1>
                <div className={styles.textAndLaptop}>
                    <div className={styles.textContent}>
                        {/* dsfu */}
                        <AboutContent1/>
                        <AboutContent2/>
                      
                    </div>
                    <Lap />
                </div>
            </section>

            <section className={featureStyles.features} id="features">
                <div className={featureStyles.heading}>
                    <p>Features</p>
                </div>

                <div className={featureStyles.content}>
                   {/* sdvfyvsad */}
                   <FeatureContent/>
                   <FeatureImage/>
                  
                </div>
            </section>

            <section className={lastStyles.Join}>
                <div className={lastStyles.container}>
                    <div className={lastStyles.heading}>Join The Sphere</div>
                    <div className={lastStyles.content}>
                        Whether you&apos;re a seasoned developer looking to streamline your workflow
                        or a newcomer eager to learn and collaborate, <span>Snippet Sphere</span>{" "}
                        welcomes you to join its vibrant community.
                    </div>
                    <img src={logo} />

                    <div className={lastStyles.content2}>
                        Sign up today and experience the <span>future of code sharing </span>
                        firsthand.
                    </div>
                    <div className={lastStyles.buttons}>
                        <button
                            type="button"
                            className={lastStyles.signup}
                            onClick={() => {
                                navigator("/signup");
                            }}
                        >
                            Sign-up
                        </button>
                        <button
                            type="button"
                            className={lastStyles.login}
                            onClick={() => {
                                navigator("/login");
                            }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </section>

            <section className={footerStyles.footer}>
                <div className={footerStyles.container}>
                    <div className={footerStyles.content}>
                        <img src={logo} />
                        <div>
                            <p>Snippet</p>
                            <p>Sphere</p>
                        </div>
                    </div>
                    <div className={footerStyles.icons}>
                        <div>
                            <FontAwesomeIcon
                                icon={faGithub}
                                onClick={() => {
                                    window.open("https://github.com/istoleabread/snippet-share");
                                }}
                                title="Snippet Sphere is open-source!"
                            />
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                onClick={() => {
                                    window.open("mailto://snippetsphere@advik.dev");
                                }}
                                title="Email us!"
                            />
                            <FontAwesomeIcon
                                icon={faReact}
                                title="This project was built in React!"
                            />
                            <FontAwesomeIcon
                                icon={faSnapchat}
                                title="This place felt empty so added a non-functional snapchat icon"
                            />
                        </div>
                    </div>
                </div>
                <p className={footerStyles["copy-rights"]}>
                    Copyright 2024 &#169; All Rights Reserved
                </p>
            </section>
        </div>
    );
}


function HomeContent() {

    const h1 = useRef(null);
    const content = useRef(null);

    useEffect(() => {
        gsap.to(h1.current, {
            x: 0,
            duration: 1,
            delay: 0.3,
        });
    }, []);


    useEffect(() => {
        gsap.to(content.current, {
            x: 0,
            duration: 1,
            delay: 0.5,
        });
    }, []);


    return (
        <div className={styles.snippetTexts}>
            <div ref={h1} className={styles.tagline}>
                <h1 >Sharing Brilliance</h1>
                <h3 >
                    One <span>Snippet</span> at a Time.
                </h3>
            </div>
            <div ref={content} className={styles.taglineText}>
                A seamless solution for sharing code <span>snippets</span>, enabling
                developers to connect, learn, and grow together.
            </div>
        </div>
    )
}

function HomeImage1() {
    const img = useRef(null)
    useEffect(() => {
        gsap.to(img.current, {
            scale: 1,
            duration: 1.2,
            delay: 0.7,
        });
    }, []);

    return (
        <div className={styles.snippets}>
            <img ref={img} src={snippets} alt="err" />
        </div>
    )
}

function Lap() {
    const img = useRef(null)
    useEffect(() => {
        gsap.to(img.current, {
            x: 0,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
                trigger: img.current,
            }
        });
    }, []);
    return (
        <div ref={img} className={styles.laptop}></div>
    )
}

function AboutContent1() {

    const content= useRef(null)
    useEffect(() => {
        gsap.to(content.current, {
            x: 0,
            duration: 1,
            delay: 0.7,
            scrollTrigger: {
                trigger: content.current,
            }
        });
    }, []);
    return (
        <div ref={content} className={styles.firstRow}>
            <img src={revolution} alt="Humans discussing different code snippets" />
            <p>
                In the ever-evolving landscape of software development,
                collaboration and knowledge sharing are paramount.
            </p>
        </div>

    )
}

function AboutContent2() {

    const content= useRef(null)
    useEffect(() => {
        gsap.to(content.current, {
            x: 0,
            duration: 0.7,
            delay: 1,
            scrollTrigger: {
                trigger: content.current,
            }
        });
    }, []);
    return (
        <div ref={content} className={styles.secondRow}>
        <p>
            Enter <span>Snippet Sphere</span>, a cutting-edge code snippet
            sharing web application poised to transform the way developers
            exchange and collaborate on code snippets.
        </p>
    </div>

    )
}
function FeatureContent(){

    const content1= useRef(null)
    useEffect(() => {
        gsap.to(content1.current, {
            x: 0,
            duration: 0.3,
            delay: 0.8,
            scrollTrigger: {
                trigger: content1.current,
            }
        });
    }, []);

    const content2= useRef(null)
    useEffect(() => {
        gsap.to(content2.current, {
            x: 0,
            duration: 0.5,
            delay: 1.1,
            scrollTrigger: {
                trigger: content2.current,
            }
        });
    }, []);

    const content3= useRef(null)
    useEffect(() => {
        gsap.to(content3.current, {
            x: 0,
            duration: 0.7,
            delay: 1.4,
            scrollTrigger: {
                trigger: content3.current,
            }
        });
    }, []);

    const content4= useRef(null)
    useEffect(() => {
        gsap.to(content4.current, {
            x: 0,
            duration: 0.9,
            delay: 1.7,
            scrollTrigger: {
                trigger: content4.current,
            }
        });
    }, []);
    return (
        <div className={featureStyles.cards}>
        <div className={featureStyles.card12}>
            <div ref={content1}className={featureStyles.card1}>
                <h1>Empowering Collaboration</h1>
                <p>
                    Snippet Sphere enables seamless sharing of code snippets with
                    colleagues, peers, and the broader developer community through
                    easily generated public links.
                </p>
            </div>
            <div ref={content3} className={featureStyles.card2}>
                <h1>Syntax Highlighting for Maximum Clarity</h1>
                <p>
                    Snippet Sphere ensures code clarity and readability with robust
                    syntax highlighting for 10 languages directly within your
                    browser, fostering seamless development experiences.
                </p>
            </div>
        </div>
        <div className={featureStyles.card34}>
            <div ref={content2}className={featureStyles.card3}>
                <h1>Sleek and Intuitive Interface</h1>
                <p>
                    Experience the epitome of simplicity and elegance with Snippet
                    Sphere&apos;s sleek and intuitive interface. Effortlessly
                    navigate through your snippets with grace, allowing your
                    creativity to flow seamlessly.
                </p>
            </div>
            <div ref={content4} className={featureStyles.card4}>
                <h1>Future Enhancements</h1>
                <p>
                    The journey of Snippet Sphere is just beginning. In the pipeline
                    are plans for additional features and enhancements, including
                    collaborative editing, public snippet library, and integration
                    with popular development platforms.
                </p>
            </div>
        </div>
    </div>
    )
}
function FeatureImage(){

    const img= useRef(null)
    useEffect(() => {
        gsap.to(img.current, {
            scale:1,
            duration: 0.7,
            delay: 2,
            scrollTrigger: {
                trigger: img.current,
            }
        });
    }, []);

    return(
        <div ref={img}className={featureStyles.imageContainer}>
        <img src={phone} />
    </div>
    )
}
export default LandingPage;
