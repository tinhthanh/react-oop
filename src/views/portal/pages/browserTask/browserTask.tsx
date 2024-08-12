/* eslint-disable no-dupe-else-if */
import React from "react";
import { useLayoutContext } from "../../contexts/LayoutContext";
import { AppRouter } from "../../../../RouterType";
import { Link, useParams } from "react-router-dom";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../../../browser-firebase-config";
import { BrowserTaskModel } from "../browser-tasks/browserTaskList";
import { ProcessStepType } from "../../../../types/commonType";
import { toast } from "sonner";
import { OrbitProgress } from "react-loading-indicators";

function IconFullscreen({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
    </svg>
  );
}

export default function BrowserTask() {
  const [time, setTime] = React.useState(-1);
  const [data, setData] = React.useState<BrowserTaskModel | null>(null);
  const [iframeStatus, setIframeStatus] = React.useState<
    "LOADING" | "RUNNING" | "STOPPED"
  >("LOADING");
  const { setActiveMenuItem, setBreadcrumb } = useLayoutContext();
  const { id } = useParams();
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    setActiveMenuItem([AppRouter.browserTasks]);
    setBreadcrumb([
      { className: "text-blue-500", title: "Management" },
      { title: "Brower Tasks" },
    ]);
  }, []);

  React.useEffect(() => {
    const dataRef = ref(database, `browser-task/${id}`);

    onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        toast.info("Connecting to server...");
        const newData = snapshot.val();
        setData(newData);
        handleDataChange(newData.processStep);
      } else {
        setData(null);
      }
    });

    return () => {
      off(dataRef);
      localStorage.removeItem("timeout");
    };
  }, [id]);

  React.useEffect(() => {
    const savedTime = localStorage.getItem("timeout");

    if (iframeStatus === "RUNNING" && savedTime) {
      const checkCountdown = () => {
        const now = new Date().getTime();
        const timeElapsed = now - new Date(savedTime).getTime();
        const remaining = 5 * 60 * 1000 - timeElapsed;

        if (remaining <= 0) {
          toast.error("Expired");
          clearInterval(countdownInterval);
        } else {
          setTime(Math.floor(remaining / 1000));
        }
      };

      const countdownInterval = setInterval(checkCountdown, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [iframeStatus, time]);

  function handleDataChange(processStep: ProcessStepType) {
    const savedTime = localStorage.getItem("timeout");
    switch (processStep) {
      case ProcessStepType.CONNECTED_LOGIN_FORM:
        toast.success("Connected");
        if (!savedTime) localStorage.setItem("timeout", new Date().toString());
        setTime(300);
        setIframeStatus("RUNNING");
        break;

      case ProcessStepType.LOGIN_FAILURE:
        toast.error("Login Failed");
        localStorage.removeItem("timeout");
        setIframeStatus("STOPPED");
        setTime(0);
        break;

      default:
        break;
    }
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function formatUrl(url: string | undefined): string {
    let urlString = `${url}vnc.html?`;

    if (url) {
      const isHasPassword = url.includes("password");
      if (!isHasPassword) {
        urlString += "password=vps@123";
      }
      const isHasResize = url.includes("resize");
      if (!isHasResize) {
        urlString += "&resize=remote";
      }
    }

    return urlString;
  }

  function openFullscreen() {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.requestFullscreen) {
        // Firefox
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.requestFullscreen) {
        // Chrome, Safari, Opera
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.requestFullscreen) {
        // IE/Edge
        iframeRef.current.requestFullscreen();
      }
    }
  }

  return (
    <div className="h-[calc(100vh - 48px)] overflow-y-auto">
      <div className="flex flex-col self-stretch gap-2">
        <div className="flex gap-2 px-6 w-full justify-between">
          <div className="justify-center py-1.5 max-md:max-w-full text-xl font-semibold leading-7 text-gray-800">
            Brower Task
          </div>
        </div>

        <div className="mx-6 rounded-lg bg-white">
          {iframeStatus === "RUNNING" && (
            <iframe
              ref={iframeRef}
              src={formatUrl(data?.virtualUrl)}
              title="Browser Task"
              className="w-full h-[calc(100vh-155px)] rounded-xl p-1 mb-2"
            />
          )}
          {iframeStatus === "LOADING" && (
            <div className="w-full h-[calc(100vh-150px)] rounded-xl p-1 flex items-center justify-center">
              <OrbitProgress
                color="#32cd32"
                size="large"
                text="Starting"
                textColor=""
              />
            </div>
          )}
          {iframeStatus === "STOPPED" && (
            <div className="w-full h-[calc(100vh-150px)] rounded-xl p-1 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="font-medium text-xl">Browser task is stopped!</div>
                <Link type="button" className="font-medium text-xl bg-blue-400 px-2 py-1 rounded-md text-white hover:text-white hover:bg-blue-500 my-4" to={`${AppRouter.browserTasks}`}>
                  Go back
                </Link>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center py-2 px-6">
            <div className="text-sm capitalize">
              Process Step:{" "}
              {data?.processStep.replace(/_/g, " ")?.toLowerCase()}
            </div>
            <div
              className={
                time < 60 && time > -1
                  ? "text-sm text-red-400 font-bold"
                  : "text-sm"
              }
            >
              <span>Remaining usage time: </span>
              <span>
                {time === 0 ? "Expired" : time > 0 ? formatTime(time) : "--"}
              </span>
            </div>
            <div>
              {iframeStatus === "RUNNING" && (
                <button
                  onClick={openFullscreen}
                  className="flex flex-row items-center hover:bg-blue-100 px-2 py-1 rounded-md"
                >
                  <IconFullscreen width={20} height={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
