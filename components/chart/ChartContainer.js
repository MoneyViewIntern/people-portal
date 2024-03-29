import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import { selectNodeService } from "./service";
import JSONDigger from "json-digger";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ChartNode from "./ChartNode";
import "./ChartContainer.css";
import axios from "axios";

const propTypes = {
  datasource: PropTypes.object.isRequired,
  pan: PropTypes.bool,
  zoom: PropTypes.bool,
  zoomoutLimit: PropTypes.number,
  zoominLimit: PropTypes.number,
  containerClass: PropTypes.string,
  chartClass: PropTypes.string,
  NodeTemplate: PropTypes.elementType,
  collapsible: PropTypes.bool,
  onClickNode: PropTypes.func,
  onClickChart: PropTypes.func,
};

/* trunk-ignore(eslint/react/display-name) */
const ChartContainer = forwardRef(
  (
    {
      datasource,
      pan = false,
      zoom = false,
      zoomoutLimit = 0.4,
      zoominLimit = 2,
      containerClass = "",
      chartClass = "",
      NodeTemplate,
      collapsible = true,
      onClickNode,
      onClickChart,
    },
    ref
  ) => {
    const container = useRef();
    const chart = useRef();
    const downloadButton = useRef();

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [transform, setTransform] = useState("");
    const [panning, setPanning] = useState(false);
    const [cursor, setCursor] = useState("default");
    const [exporting, setExporting] = useState(false);
    const [dataURL, setDataURL] = useState("");
    const [download, setDownload] = useState("");
    

    const attachRel = (data, flags) => {
      // console.log(data);
      data.relationship =
        flags + (data.reportee && data.reportee.length > 0 ? 1 : 0);
      if (data.reportee) {
        data.reportee.forEach(function (item) {
          attachRel(item, "1" + (data.reportee.length > 1 ? 1 : 0));
        });
      }
      return data;
    };

    const [ds, setDS] = useState(datasource);
    useEffect(() => {
      setDS(datasource);
    }, [datasource]);

    const dsDigger = new JSONDigger(datasource, "username", "reportee");

    const clickChartHandler = (event) => {
      if (!event.target.closest(".oc-node")) {
        if (onClickChart) {
          onClickChart();
        }
        selectNodeService.clearSelectedNodeInfo();
      }
    };

    const addChildNodes = async (node) => {
      const resp = await axios.get(
        `${process.env.SERVER_URL}/api/user/reportee/${node}`
      );
      console.log(resp.data);
      if (resp.data.length) await dsDigger.addChildren(node, resp.data);
      setDS({ ...dsDigger.ds });
    };

    const addSiblingNodes = async (nodes, username) => {
      nodes = nodes.filter((node) => node.username != username);
      console.log(nodes);
      if (nodes.length) await dsDigger.addSiblings(username, nodes);
      setDS({ ...dsDigger.ds });
    };

    const addRootNode = async (node) => {
      const resp = await axios.get(
        `${process.env.SERVER_URL}/api/user/manager/${node}`
      );
      console.log(resp.data);
      if (resp.data) {
        const { reportee, ...root } = resp.data;
        dsDigger.addRoot(root);
        addSiblingNodes(resp.data.reportee, node);
        setDS({ ...dsDigger.ds });
      }
    };

    const panEndHandler = () => {
      setPanning(false);
      setCursor("default");
    };

    const panHandler = (e) => {
      let newX = 0;
      let newY = 0;
      if (!e.targetTouches) {
        // pand on desktop
        newX = e.pageX - startX;
        newY = e.pageY - startY;
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        newX = e.targetTouches[0].pageX - startX;
        newY = e.targetTouches[0].pageY - startY;
      } else if (e.targetTouches.length > 1) {
        return;
      }
      if (transform === "") {
        if (transform.indexOf("3d") === -1) {
          setTransform("matrix(1,0,0,1," + newX + "," + newY + ")");
        } else {
          setTransform(
            "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + newX + ", " + newY + ",0,1)"
          );
        }
      } else {
        let matrix = transform.split(",");
        if (transform.indexOf("3d") === -1) {
          matrix[4] = newX;
          matrix[5] = newY + ")";
        } else {
          matrix[12] = newX;
          matrix[13] = newY;
        }
        setTransform(matrix.join(","));
      }
    };

    const panStartHandler = (e) => {
      if (e.target.closest(".oc-node")) {
        setPanning(false);
        return;
      } else {
        setPanning(true);
        setCursor("move");
      }
      let lastX = 0;
      let lastY = 0;
      if (transform !== "") {
        let matrix = transform.split(",");
        if (transform.indexOf("3d") === -1) {
          lastX = parseInt(matrix[4]);
          lastY = parseInt(matrix[5]);
        } else {
          lastX = parseInt(matrix[12]);
          lastY = parseInt(matrix[13]);
        }
      }
      if (!e.targetTouches) {
        // pand on desktop
        setStartX(e.pageX - lastX);
        setStartY(e.pageY - lastY);
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        setStartX(e.targetTouches[0].pageX - lastX);
        setStartY(e.targetTouches[0].pageY - lastY);
      } else if (e.targetTouches.length > 1) {
        return;
      }
    };

    const updateChartScale = (newScale) => {
      let matrix = [];
      let targetScale = 1;
      if (transform === "") {
        setTransform("matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)");
      } else {
        matrix = transform.split(",");
        if (transform.indexOf("3d") === -1) {
          targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);
          if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
            matrix[0] = "matrix(" + targetScale;
            matrix[3] = targetScale;
            setTransform(matrix.join(","));
          }
        } else {
          targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);
          if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
            matrix[0] = "matrix3d(" + targetScale;
            matrix[5] = targetScale;
            setTransform(matrix.join(","));
          }
        }
      }
    };

    const zoomHandler = (e) => {
      let newScale = 1 + (e.deltaY > 0 ? -0.07 : 0.07);
      updateChartScale(newScale);
    };

    const exportPDF = (canvas, exportFilename) => {
      const canvasWidth = Math.floor(canvas.width);
      const canvasHeight = Math.floor(canvas.height);
      const doc =
        canvasWidth > canvasHeight
          ? new jsPDF({
              orientation: "landscape",
              unit: "px",
              format: [canvasWidth, canvasHeight],
            })
          : new jsPDF({
              orientation: "portrait",
              unit: "px",
              format: [canvasHeight, canvasWidth],
            });
      doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0);
      doc.save(exportFilename + ".pdf");
    };

    const exportPNG = (canvas, exportFilename) => {
      const isWebkit = "WebkitAppearance" in document.documentElement.style;
      const isFf = !!window.sidebar;
      const isEdge =
        navigator.appName === "Microsoft Internet Explorer" ||
        (navigator.appName === "Netscape" &&
          navigator.appVersion.indexOf("Edge") > -1);

      if ((!isWebkit && !isFf) || isEdge) {
        window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename + ".png");
      } else {
        setDataURL(canvas.toDataURL());
        setDownload(exportFilename + ".png");
        downloadButton.current.click();
      }
    };

    const changeHierarchy = async (draggedItemData, dropTargetId) => {
      await dsDigger.removeNode(draggedItemData.username);
      await dsDigger.addChildren(dropTargetId, draggedItemData);
      setDS({ ...dsDigger.ds });
    };

    useImperativeHandle(ref, () => ({
      exportTo: (exportFilename, exportFileextension) => {
        exportFilename = exportFilename || "OrgChart";
        exportFileextension = exportFileextension || "png";
        setExporting(true);
        const originalScrollLeft = container.current.scrollLeft;
        container.current.scrollLeft = 0;
        const originalScrollTop = container.current.scrollTop;
        container.current.scrollTop = 0;
        html2canvas(chart.current, {
          width: chart.current.clientWidth,
          height: chart.current.clientHeight,
          onclone: function (clonedDoc) {
            clonedDoc.querySelector(".orgchart").style.background = "none";
            clonedDoc.querySelector(".orgchart").style.transform = "";
          },
        }).then(
          (canvas) => {
            if (exportFileextension.toLowerCase() === "pdf") {
              exportPDF(canvas, exportFilename);
            } else {
              exportPNG(canvas, exportFilename);
            }
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          },
          () => {
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          }
        );
      },
      expandAllNodes: () => {
        chart.current
          .querySelectorAll(
            ".oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed"
          )
          .forEach((el) => {
            el.classList.remove(
              "hidden",
              "isSiblingsCollapsed",
              "isAncestorsCollapsed"
            );
          });
      },
    }));

    return (
      <div
        ref={container}
        className={"orgchart-container " + containerClass}
        onWheel={zoom ? zoomHandler : undefined}
        onMouseUp={pan && panning ? panEndHandler : undefined}
      >
        <div
          ref={chart}
          className={"orgchart w-screen " + chartClass}
          style={{ transform: transform, cursor: cursor }}
          onClick={clickChartHandler}
          onMouseDown={pan ? panStartHandler : undefined}
          onMouseMove={pan && panning ? panHandler : undefined}
        >
          {datasource && (
            <ul>
              <ChartNode
                datasource={attachRel(ds, "00")}
                addChild={addChildNodes}
                addParent={addRootNode}
                NodeTemplate={NodeTemplate}
                collapsible={collapsible}
                changeHierarchy={changeHierarchy}
                onClickNode={onClickNode}
              />
            </ul>
          )}
        </div>
      </div>
    );
  }
);

ChartContainer.propTypes = propTypes;

export default ChartContainer;
