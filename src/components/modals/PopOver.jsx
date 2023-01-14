import { useEffect, useRef } from "react";
import {
  MenuList,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
} from "@mui/material";

export default function PopOvers({ anchorRef, open, setOpen, children }) {
  //   const handleToggle = () => {
  //     setOpen((prevOpen) => !prevOpen);
  //   };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    //   <div>
    //     <Button
    //   ref={anchorRef}
    //   id="composition-button"
    //   aria-controls={open ? "composition-menu" : undefined}
    //   aria-expanded={open ? "true" : undefined}
    //   aria-haspopup="true"
    //   onClick={handleToggle}
    //     >
    //       Dashboard
    //     </Button>
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                {children}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
