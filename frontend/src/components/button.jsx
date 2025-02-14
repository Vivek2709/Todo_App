const Button = ({ label, onClick, type = "primary" }) => {
    const styles = {
        primary: {
            background: "#5C67F2",
            color: "#FFFFFF",
            border: "none",
        },
        secondary: {
            background: "#FFFFFF",
            color: "#5C67F2",
            border: "1px solid #5C67F2",
        },
    };

    const buttonStyle = styles[type] || styles.primary; // Default to primary

    return (
        <button
            style={{
                ...buttonStyle,
                padding: "12px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                fontSize: "14px",
                transition: "all 0.2s ease-in-out",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px", // Space for icons if needed
            }}
            onClick={onClick}
            onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
            {label}
        </button>
    );
};

export default Button;
