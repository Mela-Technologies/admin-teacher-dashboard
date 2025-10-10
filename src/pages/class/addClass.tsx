// src/pages/class/AddClassPage.tsx
import { useClassFormController } from "./addClass/addClassController";
import AddClassForm from "./addClass/addClassForm";
import { UserRole } from "../../types/user";

const AddClassPage = ({ role }: { role: UserRole }) => {
  const controller = useClassFormController();

  return (
    <div className={`h-full ${role}`}>
      <h2 className="p-2 text-xl font-semibold border-b border-gray-200">
        Add New Class
      </h2>
      <div className="px-6 pb-12 h-full overflow-y-auto">
        <AddClassForm
          initialValues={controller.initialValues}
          sections={controller.sections}
          addSection={controller.addSection}
          removeSection={controller.removeSection}
          updateSection={controller.updateSection}
          onSubmit={controller.registerClass}
          loading={controller.loading}
        />
      </div>
    </div>
  );
};

export default AddClassPage;
