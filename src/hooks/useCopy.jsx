import { useState } from "react";
import { toast } from "react-toastify";

function useCopy() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (props) => {
    const { text, title } = props;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      toast.success(`${title} copied`);
    }, 1500);
  };

  return [copied, copyToClipboard];
}

export default useCopy;
