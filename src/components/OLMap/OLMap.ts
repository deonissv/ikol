import { Feature, Map, View } from 'ol'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import { Geometry, LineString, Point } from 'ol/geom'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { getDistance } from 'ol/sphere'
import { transform } from 'ol/proj'

class OLMap extends Map {
  markerLayer: VectorLayer<VectorSource<Geometry>>
  lineLayer: VectorLayer<VectorSource<Geometry>>

  constructor(containerId: string, point1: [number, number], point2: [number, number]) {
    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: './point24x32.png',
        scale: 0.5
      })
    })

    const markersLayer = new VectorLayer({
      style: markerStyle,
      source: new VectorSource({
        features: []
      })
    })

    const lineLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      })
    })

    super({
      layers: [new TileLayer({ source: new OSM() }), lineLayer, markersLayer],
      target: containerId,
      view: new View({
        center: [0, 0],
        zoom: 3
      })
    })
    this.markerLayer = markersLayer
    this.lineLayer = lineLayer

    this.addMarker(point1, 'point1')
    this.addMarker(point2, 'point2')
    this.addLine(point1, point2)
    this.fit()
  }

  addMarker(point: [number, number], id: string) {
    const pointTransformed = this.trans(point)
    const markerFeature = new Feature({
      id: id,
      geometry: new Point(pointTransformed)
    })
    markerFeature.setId(id)
    this.markerLayer.getSource()?.addFeature(markerFeature)
  }

  addLine(point1: [number, number], point2: [number, number]) {
    const line = new LineString([this.trans(point1), this.trans(point2)])
    const lineFeature = new Feature({
      id: 'line',
      geometry: line
    })
    lineFeature.setId('line')
    this.lineLayer.getSource()?.addFeature(lineFeature)
  }

  updateMarkers(point1: [number, number], point2: [number, number]) {
    const p1 = this.trans(point1)
    const p2 = this.trans(point2)
    this.markerLayer.getSource()!.getFeatureById('point1')?.setGeometry(new Point(p1))
    this.markerLayer.getSource()!.getFeatureById('point2')?.setGeometry(new Point(p2))
    this.fit()
  }

  updateLine(point1: [number, number], point2: [number, number]) {
    const line = new LineString([this.trans(point1), this.trans(point2)])
    this.lineLayer.getSource()!.getFeatureById('line')?.setGeometry(line)
    // this.greatCircleLine(point1, point2)
  }

  public update(point1: [number, number], point2: [number, number]): number {
    this.updateMarkers(point1, point2)
    this.updateLine(point1, point2)
    return getDistance(point1, point2)
  }

  svgPathToOLFeature(path: string) {
    const points = path.split('L')
    points[0] = points[0].replace('M', '')
    return points.map((p) => p.split(',').map((n) => parseFloat(n)))
  }

  fit() {
    this.getView().fit(this.markerLayer.getSource()!.getExtent())
    this.getView().setZoom(this.getView().getZoom()! - 1)
  }

  trans(point: [number, number]) {
    return transform([point[1], point[0]], 'EPSG:4326', 'EPSG:3857')
  }
}

export default OLMap
