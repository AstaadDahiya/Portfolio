import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aryan — AI/ML Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#050507",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle gradient */}
                <div
                    style={{
                        position: "absolute",
                        width: "800px",
                        height: "800px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(255, 59, 0,0.08) 0%, transparent 70%)",
                        top: "-200px",
                        right: "-200px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(226, 232, 240,0.06) 0%, transparent 70%)",
                        bottom: "-200px",
                        left: "-100px",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            fontSize: 120,
                            fontWeight: 800,
                            color: "white",
                            letterSpacing: "-0.04em",
                            lineHeight: 0.9,
                        }}
                    >
                        ARYAN
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                            marginTop: 16,
                            background: "linear-gradient(135deg, #FF3B00 0%, #E2E8F0 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        BUILDS THINGS THAT FLY.
                    </div>
                    <div
                        style={{
                            fontSize: 16,
                            color: "#94A3B8",
                            marginTop: 24,
                            letterSpacing: "0.15em",
                        }}
                    >
                        AI/ML ENGINEER · FULL-STACK DEVELOPER · ECE @ MAIT DELHI
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
