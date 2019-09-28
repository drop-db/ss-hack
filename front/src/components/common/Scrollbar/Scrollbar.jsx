import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import styles from "./Scrollbar.module.scss";

export default function Scrollbar(props) {

    const { scrollbarRef, withoutZIndex,ref, ...restProps } = props;

    return (
        <div className={styles.scrollbar}>
            <Scrollbars
                scrollbarRef={scrollbarRef}
                ref={scrollbarRef}

                {...restProps}

                renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
                renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}
                renderTrackVertical={props => <div {...props} className="track-vertical" style={{display:"none"}}/>}
                renderThumbVertical={props => <div {...props} className="thumb-vertical" style={{display:"none"}}/>}
            />
        </div>
    );
}
