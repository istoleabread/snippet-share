import hljs from "../requiredHighlights";
import "../styles/CodeEditor.css";
import "highlight.js/styles/base16/material-darker.css";
import firebaseConfig from "../firebase";
import { Loading } from "./Wrapper";

import { Select, Alert } from "antd";
import Editor from "react-simple-code-editor";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronLeft, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

export default function CodeEditor() {
    const navigate = useNavigate();
    const { snippetId } = useParams();
    const [title, setTitle] = useState("loading...");
    const [userCode, setUserCode] = useState("console.log('loading...')");
    const [createdAt, setCreatedAt] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [uid, setUid] = useState(0);
    const [language, setLanguage] = useState("auto");
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [copyIcon, setCopyIcon] = useState(faCopy);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const [user] = useAuthState(auth);
    const docRef = doc(firestore, "snippets", snippetId);

    useEffect(() => {
        async function getSnippet(docRef) {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return new Error("Snippet not found");
            }
        }
        getSnippet(docRef)
            .then((data) => {
                console.log(data);
                setTitle(data.title);
                setUserCode(data.content);
                setIsPublic(data.isPublic);
                const date =
                    data.createdAt.seconds * 1000 +
                    Math.floor(data.createdAt.nanoseconds / 1000000);
                setCreatedAt(new Date(date).toLocaleString());
                setLanguage(data.language);
                setUid(data.uid);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    async function updateSnippet() {
        try {
            await updateDoc(doc(firestore, "snippets", snippetId), {
                title: title,
                content: userCode,
                isPublic: isPublic,
                language: language,
            });
            setLoading(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        } catch (error) {
            console.log("Custon error");
            console.log(error.code);
        }
    }

    function highlightWithLanguage(code) {
        if (language === "auto") {
            return hljs.highlightAuto(code).value;
        } else {
            return hljs.highlight(code, { language: language }).value;
        }
    }

    return (
        <>
            {loading && <Loading />}
            {showSuccess && <Alert message="Saved Successfully!" type="success" showIcon />}
            {(isPublic || (user !== null && user.uid === uid)) && (
                <div className="editor-wrapper">
                    <div className="headerTop">
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            title="Go back"
                            onClick={() => {
                                navigate(-1);
                            }}
                        />
                        <input
                            type="text"
                            value={title}
                            disabled={user === null || user.uid !== uid}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <p>Created On: {createdAt}</p>
                    {user !== null && user.uid === uid && (
                        <TogglePublic
                            isPublic={isPublic}
                            setIsPublic={() => {
                                setIsPublic(!isPublic);
                            }}
                        />
                    )}
                    <div className="configs">
                        {user !== null && user.uid === uid && (
                            <SelectLanguage
                                setLanguage={(value) => {
                                    setLanguage(value);
                                }}
                                lang={language}
                            />
                        )}
                        <FontAwesomeIcon
                            icon={copyIcon}
                            className="copyIcon"
                            title="Copy snippet to clipboard"
                            onClick={() => {
                                navigator.clipboard.writeText(userCode);
                                setCopyIcon(faCheck);
                                setTimeout(() => {
                                    setCopyIcon(faCopy);
                                }, 1500);
                            }}
                        />
                    </div>
                    <div className="editor">
                        <Editor
                            disabled={user === null || user.uid !== uid}
                            value={userCode}
                            onValueChange={(code) => setUserCode(code)}
                            highlight={highlightWithLanguage}
                            padding={10}
                            tabSize={4}
                        />
                    </div>
                    {user && (
                        <SaveBtns
                            setSnippet={() => {
                                setLoading(true);
                                updateSnippet();
                            }}
                            goBack={() => {
                                navigate(-1);
                            }}
                        />
                    )}
                </div>
            )}
        </>
    );
}

function SaveBtns({ goBack, setSnippet }) {
    return (
        <div className="btns">
            <button type="button" className="cancel" onClick={goBack}>
                Cancel Changes
            </button>
            <button type="button" className="save" onClick={setSnippet}>
                Save Changes
            </button>
        </div>
    );
}

function TogglePublic({ isPublic, setIsPublic }) {
    return (
        <div className="togglePublic">
            <p>Public Snippet: </p>
            <input type="checkbox" checked={isPublic} onChange={setIsPublic} />
        </div>
    );
}

function SelectLanguage({ setLanguage, lang }) {
    return (
        <Select
            defaultValue={lang}
            style={{
                width: 120,
            }}
            onChange={setLanguage}
            options={[
                {
                    value: "auto",
                    label: "Auto",
                },
                {
                    value: "javascript",
                    label: "Javascript",
                },
                {
                    value: "css",
                    label: "CSS",
                },
                {
                    value: "python",
                    label: "Python",
                },
                {
                    value: "java",
                    label: "Java",
                },
                {
                    value: "kotlin",
                    label: "Kotlin",
                },
                {
                    value: "swift",
                    label: "Swift",
                },
                {
                    value: "json",
                    label: "JSON",
                },
                {
                    value: "xml",
                    label: "HTML/XML",
                },
                {
                    value: "plaintext",
                    label: "Text",
                },
                {
                    value: "sql",
                    label: "SQL",
                },
            ]}
        />
    );
}
