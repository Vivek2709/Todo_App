import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/home");
        }, 2000);
    }, [navigate]);

    return (
        <div className="splashScreen">
            <h1>Todo App</h1>
        </div>
    );
};

export default SplashScreen;
