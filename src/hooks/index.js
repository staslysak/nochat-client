import React from "react";
import { useDebouncedCallback } from "use-debounce";

export const useTyping = (data, callback) => {
  const [typing, setTyping] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [debounce] = useDebouncedCallback(async (value) => {
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

export const usePrev = (values) => {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = values;
  }, [values]);

  return ref.current;
};
