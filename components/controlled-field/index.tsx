import {
  Controller,
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ControlledFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  control: Control<T>;
  label?: string | ReactNode;
  description?: string;
  required?: boolean;
  children: (
    field: ControllerRenderProps<T, TName>,
    fieldState: ControllerFieldState,
  ) => React.ReactNode;
  alignItem?: "center" | "start";
};

export function ControlledField<T extends FieldValues, TName extends Path<T>>({
  name,
  control,
  label,
  description,
  children,
  required = true,
  alignItem = "start",
}: ControlledFieldProps<T, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          {label && (
            <FieldLabel
              htmlFor={name}
              required={required}
              className={cn(alignItem === "center" && "justify-center")}
            >
              {label}
            </FieldLabel>
          )}

          {children(field, fieldState)}

          {description && (
            <FieldDescription
              className={cn(alignItem === "center" && "text-center")}
            >
              {description}
            </FieldDescription>
          )}

          {fieldState.error && (
            <FieldError
              className={cn(alignItem === "center" && "text-center")}
              errors={[fieldState.error]}
            />
          )}
        </Field>
      )}
    />
  );
}
