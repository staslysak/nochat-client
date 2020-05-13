import { useState } from "react";
import { useDebouncedCallback as useDebounce } from "use-debounce";

export const useTyping = (data, callback) => {
  const [typing, setTyping] = useState(false);
  const [user, setUser] = useState("");
  const [debounce] = useDebounce(async (value) => {
    setTyping(false);
    await callback(value);
  }, 500);

  const onTyping = async () => {
    setTyping(true);

    if (!typing) await callback(data);

    debounce({ ...data, username: "" });
  };

  return [{ user, setUser }, onTyping];
};
