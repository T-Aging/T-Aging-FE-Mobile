import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const usePWAInstall = () => {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null
  );

  const [showIOSBanner, setShowIOSBanner] = useState(false);
  const [showAndroidButton, setShowAndroidButton] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isSafari =
      isIOS &&
      navigator.userAgent.includes("Safari") &&
      !ua.includes("crios") &&
      !ua.includes("fxios");

    // iOS Safari만 설치 가능
    if (isIOS && isSafari) {
      const isStandalone =
            navigator.standalone === true ||
            window.matchMedia("(display-mode: standalone)").matches;

      if (!isStandalone) {
        setShowIOSBanner(true);
      }
    }

    // Android Chrome만 설치 가능
    const isAndroid = /android/.test(ua);
    const isChrome =
      ua.includes("chrome") && !ua.includes("samsungbrowser");

    if (isAndroid && isChrome) {
      // 여기서는 버튼을 보여주지 않고,
      // beforeinstallprompt 이벤트를 기다렸다가 버튼 표시
      setShowAndroidButton(false);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as InstallPromptEvent);
      setShowAndroidButton(true); // 설치 가능해진 순간에만 버튼 표시
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installPWA = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setShowAndroidButton(false);
  };

  return {
    showIOSBanner,
    showAndroidButton,
    installPWA,
  };
};
