import React, { ReactNode } from "react";
import { useLayoutContext } from "../../contexts/LayoutContext";
import { AppRouter } from "../../../../RouterType";
import { ref, onValue, update } from "firebase/database";
import { database } from "../../../../browser-firebase-config";
import { ProcessStepType } from "../../../../types/commonType";
import { Atom, OrbitProgress } from "react-loading-indicators";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

export interface BrowserTaskModel {
  processStep: ProcessStepType;
  serverIp: string;
  taskId: string;
  virtualUrl: string;
  username: string;
}

function IconPlayFill({ ...props }: React.SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM6.79 5.093A.5.5 0 006 5.5v5a.5.5 0 00.79.407l3.5-2.5a.5.5 0 000-.814l-3.5-2.5z" />
    </svg>
  );
}

export default function BrowserTaskList() {
  const { setActiveMenuItem, setBreadcrumb } = useLayoutContext();
  const [task, setTask] = React.useState<BrowserTaskModel | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { keycloak } = useKeycloak();

  React.useEffect(() => {
    setActiveMenuItem([AppRouter.browserTasks]);
    setBreadcrumb([
      { className: "text-blue-500", title: "Management" },
      { title: "Brower Tasks" },
    ]);
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    const dataRef = ref(database, "browser-task");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasks: BrowserTaskModel[] = Object.values(data);
        const availableTasks: BrowserTaskModel[] = tasks.filter(
          (x) =>
            [
              ProcessStepType.APP_STARTED,
              ProcessStepType.LOGIN_SUCCESS,
              ProcessStepType.LOGIN_FAILURE,
            ].includes(x.processStep) && x.virtualUrl
        );

        setTask(availableTasks[0]);
        setIsLoading(false);
      }
    });
  }, []);

  function startBrowser() {
    setIsLoading(true);
    const taskRef = ref(database, `browser-task/${task?.taskId}`);
    const data = { ...task };
    data.processStep = ProcessStepType.CONNECT_GOOGLE;
    data.username = keycloak?.tokenParsed?.preferred_username;
    update(taskRef, data);
    setIsLoading(false);
  }

  return (
    <div className="h-[calc(100vh-48px)] overflow-y-auto">
      <div className="flex flex-col self-stretch gap-4">
        <div className="flex gap-5 px-5 w-full justify-between">
          <div className="justify-center py-1.5 max-md:max-w-full text-xl font-semibold leading-7 text-gray-800">
            Brower Tasks
          </div>
        </div>

        <div className="card mx-6 p-6 h-[calc(100vh-200px)] rounded-lg flex justify-center items-center">
          {isLoading && !task && (
            <OrbitProgress color="#32cd32" size="large" text="" textColor="" />
          )}
          {!isLoading && !task && (
            <div className="flex flex-col items-center justify-center">
              <Atom color="#32cd32" size="medium" text="" textColor="" />
              <span className="font-medium text-xl my-4 text-slate-950">
                Please wait, there are currently no browser tasks available.
              </span>
            </div>
          )}
          {!isLoading && task && (
            <div className="flex flex-col items-center justify-center">
              <Link
                to={`${AppRouter.browserTasks}/${task?.taskId}`}
                onClick={startBrowser}
                className="flex flex-col justify-center items-center rounded-full text-green-600 hover:text-green-500"
              >
                <IconPlayFill width={100} height={100} />
                <span className="font-medium text-xl my-4 text-slate-950">
                  Start Browser
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
