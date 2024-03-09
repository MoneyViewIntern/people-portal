import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { dragNodeService, selectNodeService } from "./service";
import "./ChartNode.css";
import JSONDigger from "json-digger";
import axios from "axios";

const propTypes = {
  datasource: PropTypes.object,
  addParent:PropTypes.func,
  addChild:PropTypes.func,
  NodeTemplate: PropTypes.elementType,
  draggable: PropTypes.bool,
  collapsible: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  changeHierarchy: PropTypes.func,
  onClickNode: PropTypes.func,
};

const defaultProps = {
  draggable: false,
  collapsible: true,
  multipleSelect: false
};

const ChartNode = ({
  datasource,
  addChild,
  addParent,
  NodeTemplate,
  draggable,
  collapsible,
  multipleSelect,
  changeHierarchy,
  onClickNode,
}) => {
  const node = useRef();

  const [isChildrenCollapsed, setIsChildrenCollapsed] = useState(false);
  const [topEdgeExpanded, setTopEdgeExpanded] = useState();
  const [rightEdgeExpanded, setRightEdgeExpanded] = useState();
  const [bottomEdgeExpanded, setBottomEdgeExpanded] = useState();
  const [leftEdgeExpanded, setLeftEdgeExpanded] = useState();
  const [allowedDrop, setAllowedDrop] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isFetchedBottom,setIsFetchedBottom]=useState(false);
  const [isFetchedTop,setIsFetchedTop]=useState(false);

  const nodeClass = [
    "oc-node",
    isChildrenCollapsed ? "isChildrenCollapsed" : "",
    allowedDrop ? "allowedDrop" : "",
    selected ? "selected" : ""
  ]
    .filter(item => item)
    .join(" ");

  useEffect(() => {
    const subs1 = dragNodeService.getDragInfo().subscribe(draggedInfo => {
      if (draggedInfo) {
        setAllowedDrop(
          !document
            .querySelector("#" + draggedInfo.draggedNodeId)
            .closest("li")
            .querySelector("#" + node.current.username)
            ? true
            : false
        );
      } else {
        setAllowedDrop(false);
      }
    });

    const subs2 = selectNodeService
      .getSelectedNodeInfo()
      .subscribe(selectedNodeInfo => {
        if (selectedNodeInfo) {
          if (multipleSelect) {
            if (selectedNodeInfo.selectedNodeId === datasource.username) {
              setSelected(true);
            }
          } else {
            setSelected(selectedNodeInfo.selectedNodeId === datasource.username);
          }
        } else {
          setSelected(false);
        }
      });

    return () => {
      subs1.unsubscribe();
      subs2.unsubscribe();
    };
  }, [ datasource]);

  const addArrows = e => {
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    console.log(parent);
    const isAncestorsCollapsed =
      node && parent
        ? parent.firstChild.classList.contains("hidden")
        : undefined;
    const isSiblingsCollapsed = Array.from(
      node.parentNode.children
    ).some(item => item.classList.contains("hidden"));
    
    if (isAncestorsCollapsed===undefined && !isFetchedTop){
      setTopEdgeExpanded(isFetchedTop);
    }
    else {
      setTopEdgeExpanded(!isAncestorsCollapsed);
    }
    

    setRightEdgeExpanded(!isSiblingsCollapsed);
    setLeftEdgeExpanded(!isSiblingsCollapsed);
    if (!isFetchedBottom){
      setBottomEdgeExpanded(isFetchedBottom);
    }
    else{
    setBottomEdgeExpanded(!isChildrenCollapsed);
    }
  };

  const removeArrows = () => {
    setTopEdgeExpanded(undefined);
    setRightEdgeExpanded(undefined);
    setBottomEdgeExpanded(undefined);
    setLeftEdgeExpanded(undefined);
  };

  const toggleAncestors = actionNode => {
    let node = actionNode.parentNode.closest("li");
    if (!node) return;
    const isAncestorsCollapsed = node.firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      
      actionNode.classList.remove("isAncestorsCollapsed");
      node.firstChild.classList.remove("hidden");
    } else {
      const isSiblingsCollapsed = Array.from(
        actionNode.parentNode.children
      ).some(item => item.classList.contains("hidden"));
      if (!isSiblingsCollapsed) {
        toggleSiblings(actionNode);
      }
      actionNode.classList.add(
        ...(
          "isAncestorsCollapsed" +
          (isSiblingsCollapsed ? "" : " isSiblingsCollapsed")
        ).split(" ")
      );
      node.firstChild.classList.add("hidden");
      if (
        node.parentNode.closest("li") &&
        !node.parentNode.closest("li").firstChild.classList.contains("hidden")
      ) {
        toggleAncestors(node);
      }
    }
  };

  const topEdgeClickHandler = async (e) => {
    e.stopPropagation();
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    if (!parent){
      addParent(datasource.username);
      setIsFetchedTop(true);
    }
     setTopEdgeExpanded(!topEdgeExpanded);
    toggleAncestors(e.target.closest("li"));
  };

  const bottomEdgeClickHandler = e => {
    e.stopPropagation();

    if (!datasource.reportee){ 
      addChild(datasource.username)
      setIsFetchedBottom(!isFetchedBottom);
      
    }
    setIsChildrenCollapsed(!isChildrenCollapsed);
    setBottomEdgeExpanded(!bottomEdgeExpanded);
  };

  const toggleSiblings = actionNode => {
    let node = actionNode.previousSibling;
    const isSiblingsCollapsed = Array.from(
      actionNode.parentNode.children
    ).some(item => item.classList.contains("hidden"));
    actionNode.classList.toggle("isSiblingsCollapsed", !isSiblingsCollapsed);
     while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
      node = node.previousSibling;
    }
    node = actionNode.nextSibling;
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
      node = node.nextSibling;
    }
    const isAncestorsCollapsed = actionNode.parentNode
      .closest("li")
      .firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      toggleAncestors(actionNode);
    }
  };

  const hEdgeClickHandler = e => {
    e.stopPropagation();
    setLeftEdgeExpanded(!leftEdgeExpanded);
    setRightEdgeExpanded(!rightEdgeExpanded);
    toggleSiblings(e.target.closest("li"));
  };

  const filterAllowedDropNodes = id => {
    dragNodeService.sendDragInfo(id);
  };

  const clickNodeHandler = event => {
    
    if (onClickNode) {
     
      onClickNode(datasource);
    }

    selectNodeService.sendSelectedNodeInfo(datasource.username);
  };

  const dragstartHandler = event => {
    const copyDS = { ...datasource };
    delete copyDS.relationship;
    event.dataTransfer.setData("text/plain", JSON.stringify(copyDS));
    // highlight all potential drop targets
    filterAllowedDropNodes(node.current.username);
  };

  const dragoverHandler = event => {
    // prevent default to allow drop
    event.preventDefault();
  };

  const dragendHandler = () => {
    // reset background of all potential drop targets
    dragNodeService.clearDragInfo();
  };

  const dropHandler = event => {
    if (!event.currentTarget.classList.contains("allowedDrop")) {
      return;
    }
    dragNodeService.clearDragInfo();
    changeHierarchy(
      JSON.parse(event.dataTransfer.getData("text/plain")),
      event.currentTarget.username
    );
  };

  return (
    <li className="oc-hierarchy">
      <div
        ref={node}
        id={datasource.username}
        className={nodeClass}
        draggable={draggable ? "true" : undefined}
        onClick={clickNodeHandler}
        onDragStart={dragstartHandler}
        onDragOver={dragoverHandler}
        onDragEnd={dragendHandler}
        onDrop={dropHandler}
        onMouseEnter={addArrows}
        onMouseLeave={removeArrows}
      >
        {NodeTemplate ? (
          <NodeTemplate nodeData={datasource} />
        ) : (
          <>
            <div className="oc-heading">
              {datasource.relationship &&
                datasource.relationship.charAt(2) === "1" && (
                  <i className="oci oci-leader oc-symbol" />
                )}
              {datasource.name}
            </div>
            <div className="oc-content">{datasource.designation}-{datasource.level}</div>
          </>
        )}
        { (!isFetchedTop || (collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(0) === "1") ) && (
            <i
              className={`oc-edge verticalEdge topEdge oci ${
                topEdgeExpanded === undefined
                  ? ""
                  : topEdgeExpanded
                  ? "oci-chevron-down"
                  : "oci-chevron-up"
              }`}
              onClick={topEdgeClickHandler}
            />
          )}
        {collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(1) === "1" && (
            <>
              <i
                className={`oc-edge horizontalEdge rightEdge oci ${
                  rightEdgeExpanded === undefined
                    ? ""
                    : rightEdgeExpanded
                    ? "oci-chevron-left"
                    : "oci-chevron-right"
                }`}
                onClick={hEdgeClickHandler}
              />
              <i
                className={`oc-edge horizontalEdge leftEdge oci ${
                  leftEdgeExpanded === undefined
                    ? ""
                    : leftEdgeExpanded
                    ? "oci-chevron-right"
                    : "oci-chevron-left"
                }`}
                onClick={hEdgeClickHandler}
              />
            </>
          )}
        {(!isFetchedBottom ||(collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(2) === "1")) && (
            <i
              className={`oc-edge verticalEdge bottomEdge oci ${
                bottomEdgeExpanded === undefined
                  ? ""
                  : bottomEdgeExpanded
                  ? "oci-chevron-up"
                  : "oci-chevron-down"
              }`}
              onClick={bottomEdgeClickHandler}
            />
          )}
      </div>
      {datasource.reportee && datasource.reportee.length > 0 && (
        <ul className={isChildrenCollapsed ? "hidden" : ""}>
          {datasource.reportee.map(node => (
            <ChartNode
              addParent={addParent}
              addChild={addChild}
              datasource={node}
              NodeTemplate={NodeTemplate}
              id={node.username}
              key={node.username}
              draggable={draggable}
              collapsible={collapsible}
              multipleSelect={multipleSelect}
              changeHierarchy={changeHierarchy}
              onClickNode={onClickNode}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

ChartNode.propTypes = propTypes;
ChartNode.defaultProps = defaultProps;

export default ChartNode;
