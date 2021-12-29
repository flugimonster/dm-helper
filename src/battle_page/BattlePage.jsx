import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ListOfCharacters } from "./ListOfCharacters";
const { ipcRenderer, remote } = window.require("electron");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const BattlePage = () => {
  let q = useQuery();

  const [characters, setCharacters] = useState();
  const [variant, setVariant] = useState("horizontal");

  useEffect(() => {
    setCharacters(JSON.parse(q.get("data")));
    // parsing q should only happen on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // let largetWidth, largestHeight = 0;
    // remote.screen.getAllDisplays().forEach((display) => {
    //   const { currentWidth, currentHeight } = display.bounds;
    //   if (currentWidth)
    // })

    const { width, height } = remote.screen.getAllDisplays()[1].bounds;
    const IMAGE_HEIGHT = 300;
    const IMAGE_WIDTH = 230;
    if (characters) {
      const [x, y] =
        variant === "vertical"
          ? [IMAGE_HEIGHT, IMAGE_WIDTH * characters.length]
          : [IMAGE_WIDTH * (characters.length), IMAGE_HEIGHT];
      remote
        .getCurrentWindow()
        .setSize(Math.min(x, width), Math.min(y, height));
        // console.log('x, y: ', x, y);
        // console.log('width, height: ', width, height);
        // console.log('window size: ', remote.getCurrentWindow().getSize());

    }
  }, [variant, characters]);

  useEffect(() => {
    ipcRenderer.on("dataUpdate", (e, a) => {
      setCharacters(a.data);
    });
    return () => ipcRenderer.removeAllListeners("hp");
  }, [setCharacters]);

  useEffect(() => {
    ipcRenderer.on("variant", (e, a) => {
      setVariant(a.variant);
    });
    return () => ipcRenderer.removeAllListeners("variant");
  }, [setVariant]);

  return (
    <>
      {characters && (
        <ListOfCharacters variant={variant} characters={characters} />
      )}
    </>
  );
};