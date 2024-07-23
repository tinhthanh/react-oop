import { useEffect } from "react";

export default function LayoutPortalHook() {
    useEffect(() => {
        console.log("init portal");
        return () => {
            console.log('Component portal unmount');
        };
    }, []);
    return {
        
    };
}