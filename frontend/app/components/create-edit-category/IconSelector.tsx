import { categoryIcons } from "@/constants/category-options";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

type IconSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const IconSelector = ({ value, onChange }: IconSelectorProps) => {
  const selectedClassName = "border-brand-base [&_svg]:text-gray-600 bg-gray-100";

  return (
    <div className="flex flex-col gap-2">
      <Label className="font-medium">Ícone</Label>

      <div className="flex flex-row flex-wrap gap-2">
        {categoryIcons.map(({ value: optionValue, label, Icon }) => (
          <Button
            key={optionValue}
            type="button"
            variant="outline"
            aria-label={`Selecionar ícone ${label}`}
            aria-pressed={value === optionValue}
            onClick={() => onChange(optionValue)}
            className={`w-10.5 h-10.5 p-0! [&_svg]:w-5! [&_svg]:h-5! [&_svg]:text-gray-500 ${
              value === optionValue ? selectedClassName : ""
            }`}
          >
            <Icon />
          </Button>
        ))}
      </div>
    </div>
  );
};
