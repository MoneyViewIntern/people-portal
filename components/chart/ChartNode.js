import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { selectNodeService } from "./service";
import "./ChartNode.css";

// Prop types definition
const propTypes = {
  datasource: PropTypes.object,
  addParent: PropTypes.func,
  addChild: PropTypes.func,
  NodeTemplate: PropTypes.elementType,
  collapsible: PropTypes.bool,
  changeHierarchy: PropTypes.func,
  onClickNode: PropTypes.func,
};

// Default props
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
  collapsible,
  changeHierarchy,
  onClickNode,
}) => {
  // Ref for the node element
  const node = useRef();

  // State variables
  const [isChildrenCollapsed, setIsChildrenCollapsed] = useState(false);
  const [topEdgeExpanded, setTopEdgeExpanded] = useState();
  const [rightEdgeExpanded, setRightEdgeExpanded] = useState();
  const [bottomEdgeExpanded, setBottomEdgeExpanded] = useState();
  const [leftEdgeExpanded, setLeftEdgeExpanded] = useState();
  const [selected, setSelected] = useState(false);
  const [isFetchedBottom, setIsFetchedBottom] = useState(false);
  const [isFetchedTop, setIsFetchedTop] = useState(false);

  // CSS class for the node element
  const nodeClass = [
    "oc-node",
    isChildrenCollapsed ? "isChildrenCollapsed" : "",
    selected ? "selected" : ""
  ]
    .filter(item => item)
    .join(" ");

  // Effect to handle subscription and unsubscription
  useEffect(() => {
    const subs2 = selectNodeService
      .getSelectedNodeInfo()
      .subscribe(selectedNodeInfo => {
        if (selectedNodeInfo) {
          setSelected(selectedNodeInfo.selectedNodeId === datasource.username);
        } else {
          setSelected(false);
        }
      });
    setIsFetchedBottom(false);
    setIsFetchedTop(false);
    return () => {
      subs2.unsubscribe();
    };
  }, [datasource]);

  // Function to add arrows on hover
  const addArrows = e => {
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    const isAncestorsCollapsed =
      node && parent
        ? parent.firstChild.classList.contains("hidden")
        : undefined;
    const isSiblingsCollapsed = Array.from(
      node.parentNode.children
    ).some(item => item.classList.contains("hidden"));
    if (isAncestorsCollapsed === undefined && !isFetchedTop) {
      setTopEdgeExpanded(isFetchedTop);
    } else {
      setTopEdgeExpanded(!isAncestorsCollapsed);
    }
    setRightEdgeExpanded(!isSiblingsCollapsed);
    setLeftEdgeExpanded(!isSiblingsCollapsed);
    if (!isFetchedBottom) {
      setBottomEdgeExpanded(isFetchedBottom);
    } else {
      setBottomEdgeExpanded(!isChildrenCollapsed);
    }
  };

  // Function to remove arrows on mouse leave
  const removeArrows = () => {
    setTopEdgeExpanded(undefined);
    setRightEdgeExpanded(undefined);
    setBottomEdgeExpanded(undefined);
    setLeftEdgeExpanded(undefined);
  };

  // Function to toggle ancestors visibility
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

  // Function to handle click on top edge
  const topEdgeClickHandler = async (e) => {
    e.stopPropagation();
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    if (!parent) {
      addParent(datasource.username);
      setIsFetchedTop(true);
    }
    setTopEdgeExpanded(!topEdgeExpanded);
    toggleAncestors(e.target.closest("li"));
  };

  // Function to handle click on bottom edge
  const bottomEdgeClickHandler = e => {
    e.stopPropagation();
    if (!datasource.reportee && !isFetchedBottom) {
      addChild(datasource.username)
      setIsFetchedBottom(!isFetchedBottom);
    } else {
      setIsChildrenCollapsed(!isChildrenCollapsed);
      setBottomEdgeExpanded(!bottomEdgeExpanded);
    }
  };

  // Function to toggle siblings visibility
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

  // Function to handle click on horizontal edges
  const hEdgeClickHandler = e => {
    e.stopPropagation();
    setLeftEdgeExpanded(!leftEdgeExpanded);
    setRightEdgeExpanded(!rightEdgeExpanded);
    toggleSiblings(e.target.closest("li"));
  };


  // Function to handle click on node
  const clickNodeHandler = event => {
    if (onClickNode) {
      const {reportee,...selectedNode}=datasource;
      console.log(selectedNode);
      onClickNode(selectedNode);
    }
    selectNodeService.sendSelectedNodeInfo(datasource.username);
  };

  return (
    <li className="oc-hierarchy">
      <div
        ref={node}
        id={datasource.username}
        className={nodeClass}
        onClick={clickNodeHandler}
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
        {(!isFetchedTop || (collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(0) === "1")) && (
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
        {(!isFetchedBottom || (collapsible &&
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
              collapsible={collapsible}
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
