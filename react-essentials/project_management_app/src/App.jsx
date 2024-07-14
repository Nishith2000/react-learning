import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectsState((oldProjectState) => ({
      ...oldProjectState,
      selectedProject: null,
    }));
  }

  function handleAddProject(projectData) {
    setProjectsState((oldProjectState) => ({
      ...oldProjectState,
      selectedProject: undefined,
      projects: [
        ...oldProjectState.projects,
        { ...projectData, id: Math.random() },
      ],
    }));
  }

  function handleCancelProject() {
    setProjectsState((oldProjectState) => ({
      ...oldProjectState,
      selectedProject: undefined,
    }));
  }

  function handleProjectSelection(id) {
    setProjectsState((oldProjectState) => ({
      ...oldProjectState,
      selectedProject: id,
    }));
  }

  function handleDeleteProject() {
    setProjectsState((oldProjectState) => ({
      ...oldProjectState,
      selectedProject: undefined,
      projects: oldProjectState.projects.filter(
        (project) => project.id !== oldProjectState.selectedProject
      ),
    }));
  }

  function handleAddTask(text) {
    setProjectsState((oldProjectState) => {
      const newTask = {
        text,
        projectId: oldProjectState.selectedProject,
        id: Math.random(),
      };
      return { ...oldProjectState, tasks: [...oldProjectState.tasks, newTask] };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((oldProjectState) => ({
      ...oldProjectState,
      tasks: oldProjectState.tasks.filter((task) => task.id !== id),
    }));
  }

  // console.log(projectsState.tasks);

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProject
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onProjectDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProject === null) {
    content = (
      <NewProject
        onProjectAdd={handleAddProject}
        onProjectCancel={handleCancelProject}
      />
    );
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onProjectCreation={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        projects={projectsState.projects}
        onProjectCreation={handleStartAddProject}
        onProjectSelection={handleProjectSelection}
        selectedProjectId={projectsState.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
