// Import the styles for the component

interface Button2Props {
  label: string;
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export const Button2 = ({ label, primary = false, backgroundColor, size = "medium", ...props }: Button2Props) => {
  const mode = primary ? "storybook-button--primary" : "storybook-button--secondary"
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button-${size}`, mode].join(" ")}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  )

}
