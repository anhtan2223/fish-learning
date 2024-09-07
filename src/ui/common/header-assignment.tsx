import Logo from "@/ui/common/logo";
import SwitchMode from "@/ui/common/switch-mode";

export default function HeaderAssignment() {
  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-grow">
          <Logo></Logo>
        </div>
        <SwitchMode></SwitchMode>
      </div>
    </>
  );
}
