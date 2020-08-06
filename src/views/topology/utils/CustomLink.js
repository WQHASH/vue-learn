/*
 * @Description: CustomLink类
 * @Author: wangqi
 * @Date: 2020-08-06 22:13:46
 * @LastEditTime: 2020-08-06 23:25:01
 */
class CustomLink {
    constructor() {
        go.Link.call(this);
    }

    findSidePortIndexAndCount(node, port) {
        var nodedata = node.data;
        if (nodedata !== null) {
            var portdata = port.data;
            var side = port._side;
            var arr = nodedata[side + "Array"];
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                if (arr[i] === portdata) return [i, len];
            }
        }
        return [-1, len];
    }

    computeEndSegmentLength(node, port, spot, from) {
        console.log(this, "computeEndSegmentLength");
        var esl = go.Link.prototype.computeEndSegmentLength.call(this, node, port, spot, from);
        var other = this.getOtherPort(port);
        if (port !== null && other !== null) {
            var thispt = port.getDocumentPoint(this.computeSpot(from));
            var otherpt = other.getDocumentPoint(this.computeSpot(!from));
            if (Math.abs(thispt.x - otherpt.x) > 20 || Math.abs(thispt.y - otherpt.y) > 20) {
                var info = this.findSidePortIndexAndCount(node, port);
                var idx = info[0];
                var count = info[1];
                if (port._side == "top" || port._side == "bottom") {
                    if (otherpt.x < thispt.x) {
                        return esl + 4 + idx * 8;
                    } else {
                        return esl + (count - idx - 1) * 8;
                    }
                } else {  // left or right
                    if (otherpt.y < thispt.y) {
                        return esl + 4 + idx * 8;
                    } else {
                        return esl + (count - idx - 1) * 8;
                    }
                }
            }
        }
        return esl;
    }

    hasCurviness() {
        if (isNaN(this.curviness)) return true;
        return go.Link.prototype.hasCurviness.call(this);
    }

    computeCurviness() {
        if (isNaN(this.curviness)) {
            var fromnode = this.fromNode;
            var fromport = this.fromPort;
            var fromspot = this.computeSpot(true);
            var frompt = fromport.getDocumentPoint(fromspot);
            var tonode = this.toNode;
            var toport = this.toPort;
            var tospot = this.computeSpot(false);
            var topt = toport.getDocumentPoint(tospot);
            if (Math.abs(frompt.x - topt.x) > 20 || Math.abs(frompt.y - topt.y) > 20) {
                if ((fromspot.equals(go.Spot.Left) || fromspot.equals(go.Spot.Right)) &&
                    (tospot.equals(go.Spot.Left) || tospot.equals(go.Spot.Right))) {
                    var fromseglen = this.computeEndSegmentLength(fromnode, fromport, fromspot, true);
                    var toseglen = this.computeEndSegmentLength(tonode, toport, tospot, false);
                    var c = (fromseglen - toseglen) / 2;
                    if (frompt.x + fromseglen >= topt.x - toseglen) {
                        if (frompt.y < topt.y) return c;
                        if (frompt.y > topt.y) return -c;
                    }
                } else if ((fromspot.equals(go.Spot.Top) || fromspot.equals(go.Spot.Bottom)) &&
                    (tospot.equals(go.Spot.Top) || tospot.equals(go.Spot.Bottom))) {
                    var fromseglen = this.computeEndSegmentLength(fromnode, fromport, fromspot, true);
                    var toseglen = this.computeEndSegmentLength(tonode, toport, tospot, false);
                    var c = (fromseglen - toseglen) / 2;
                    if (frompt.x + fromseglen >= topt.x - toseglen) {
                        if (frompt.y < topt.y) return c;
                        if (frompt.y > topt.y) return -c;
                    }
                }
            }
        }
        return go.Link.prototype.computeCurviness.call(this);
    }

}

export default CustomLink
