import { categoryColors } from "@/constants/category-options";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

type ColorSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ColorSelector = ({ value, onChange }: ColorSelectorProps) => {
  const selectedClassName = "border-brand-base bg-gray-100";

  return (
    <div className="flex flex-col gap-2">
      <Label className="font-medium">Cor</Label>

      <div className="flex flex-row flex-wrap gap-2">
        {categoryColors.map(({ value: optionValue, label, swatchClassName }) => (
          <Button
            key={optionValue}
            type="button"
            variant="outline"
            aria-label={`Selecionar cor ${label}`}
            aria-pressed={value === optionValue}
            onClick={() => onChange(optionValue)}
            className={`p-1! ${value === optionValue ? selectedClassName : ""}`}
          >
            <div className={`w-10 h-5 rounded-sm ${swatchClassName}`} />
          </Button>
        ))}
      </div>
    </div>
  );
};
