"use client";

type ConfirmSubmitButtonProps = {
  message: string;
  children: React.ReactNode;
  className: string;
};

export function ConfirmSubmitButton({ message, children, className }: ConfirmSubmitButtonProps) {
  return (
    <button
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
