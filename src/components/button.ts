import styles from "./button.module.css";

type CreateButtonOptions = {
  text: string;
  onClick?: (event: MouseEvent) => void | Promise<void>;
  classes?: string[];
};

const createButton = (options: CreateButtonOptions) => {
  const { text, classes, onClick } = options;

  const element = document.createElement("button");
  element.textContent = text;
  element.classList.add(...(classes ?? []), styles.button);

  if (onClick) {
    element.addEventListener("click", onClick);
  }

  const updateTextContent = (content: string) => {
    element.textContent = content;
  };

  const hide = () => {
    element.classList.add(styles.hide);
  };

  const show = () => {
    element.classList.remove(styles.hide);
  };

  return { element, updateTextContent, hide, show };
};

export { createButton, type CreateButtonOptions };
