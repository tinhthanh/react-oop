import React from "react";
import { useLayoutContext } from "../../contexts/LayoutContext";
import { AppRouter } from "../../../../RouterType";
import { ref, onValue, update } from "firebase/database";
import { database } from "../../../../browser-firebase-config";
import { ProcessStepType } from "../../../../types/commonType";
import { OrbitProgress } from "react-loading-indicators";
import { Link } from "react-router-dom";

export interface BrowserTaskModel {
  processStep: ProcessStepType;
  serverIp: string;
  taskId: string;
  virtualUrl: string;
}

function IconPlayFill({ height = 16, width = 16, ...props }: any) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height={height}
      width={width}
      {...props}
    >
      <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM6.79 5.093A.5.5 0 006 5.5v5a.5.5 0 00.79.407l3.5-2.5a.5.5 0 000-.814l-3.5-2.5z" />
    </svg>
  );
}

export default function BrowserTaskList() {
  const { setActiveMenuItem, setBreadcrumb } = useLayoutContext();
  const [task, setTask] = React.useState<BrowserTaskModel | null>(null);

  React.useEffect(() => {
    setActiveMenuItem([AppRouter.browserTasks]);
    setBreadcrumb([
      { className: "text-blue-500", title: "Management" },
      { title: "Brower Tasks" },
    ]);
  }, []);

  React.useEffect(() => {
    const dataRef = ref(database, "browser-task");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasks: BrowserTaskModel[] = Object.values(data);

        const availableTasks: BrowserTaskModel[] = tasks.filter((x) =>
          ([
            ProcessStepType.APP_STARTED,
            ProcessStepType.LOGIN_SUCCESS,
            ProcessStepType.LOGIN_FAILURE,
          ].includes(x.processStep)) && x.virtualUrl
        );

        setTask(availableTasks[0]);
      }
    });
  }, []);

  function startBrowser() {
    const taskRef = ref(database, `browser-task/${task?.taskId}`);
    const data = { ...task };
    data.processStep = ProcessStepType.CONNECT_GOOGLE;
    update(taskRef, data);
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
          {task ? (
            <div className="flex flex-col items-center justify-center">
              <Link
                to={`${AppRouter.browserTasks}/${task.taskId}`}
                onClick={startBrowser}
                className="flex flex-col justify-center items-center rounded-full text-green-600 hover:text-green-500"
              >
                <IconPlayFill width={100} height={100} />
                <span className="font-medium text-xl my-4 text-slate-950">
                  Start Browser
                </span>
              </Link>
            </div>
          ) : (
            <>
              <OrbitProgress
                color="#32cd32"
                size="large"
                text=""
                textColor=""
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
