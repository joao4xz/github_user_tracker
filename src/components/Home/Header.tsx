import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type HeaderProps = {
  setSubmitValue: React.Dispatch<React.SetStateAction<string>>;
};

export function Header({ setSubmitValue }: HeaderProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      className="flex flex-col gap-6 max-w-1/4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitValue(inputValue);
      }}
    >
      <Input onChange={(e) => setInputValue(e.target.value)} />
      <Button type="submit">Add user</Button>
    </form>
  );
}
