import React from "react";
import styled from "@emotion/styled";
import Slider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

export default function Home() {
  return (
    <Slider bullets={false}>
      <div data-src="path/to/image-1.jpg" />
      <div data-src="path/to/image-2.jpg" />
      <div data-src="path/to/image-3.jpg" />
    </Slider>
  );
}
