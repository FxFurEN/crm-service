import clipboardCopy from "clipboard-copy";
import { useEffect, useState } from "react";


const EmployeesModal = () => {
    const [invitationCode, setInvitationCode] = useState(() => localStorage.getItem('invitationCode') || null);
    const [timer, setTimer] = useState(() => localStorage.getItem('timer') || 300);
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const secretKey = "f1k71v3-s3cr3t-k3y";

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    const newTimer = prevTimer - 1;
                    localStorage.setItem('timer', newTimer);
                    return newTimer;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timer]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }


    function copyToClipboard() {
        if (invitationCode) {
            clipboardCopy(invitationCode);
            setCopied(true);
            setShowToast(true);

            setTimeout(() => {
                setCopied(false);
                setShowToast(false);
            }, 500);
        }
    }

    function generateInvitationCode() {
        const payload = {
            code: Math.random().toString(36).substr(2, 6).toUpperCase(),
            exp: Math.floor(Date.now() / 1000) + 300,
        };
        const encodedHeader = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const encodedPayload = btoa(JSON.stringify(payload));
        const signature = btoa(
            new TextEncoder().encode(encodedHeader + "." + encodedPayload + secretKey)
        );
        const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

        setInvitationCode(jwt);
        localStorage.setItem('invitationCode', jwt);
        setTimer(300);
        localStorage.setItem('timer', 300);
        setCopied(false);
    }

    return (
        <div></div>
    );
}

export default EmployeesModal;
