export type ProjectCaseStudy = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  problem: string;
  goal: string;
  dataSources: string[];
  workflow: string[];
  skillsDemonstrated: string[];
  thumbnail: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  fullResolution?: {
    href: string;
    label: string;
  };
};

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "metro-vancouver-geology-cartography",
    title: "Metro Vancouver Geology Cartography",
    summary:
      "Produced publication-focused geological maps and route figures for a faculty-led geology chapter.",
    outcome:
      "Delivered clean, print-ready figures with consistent projection and symbology standards for manuscript review.",
    problem:
      "Faculty research required consistent, publication-ready mapping products from mixed geospatial sources.",
    goal: "Build a reusable cartography workflow for geology, study-area, and route maps.",
    dataSources: [
      "Geological Survey of Canada",
      "BC Data Catalogue",
      "TransLink GTFS",
    ],
    workflow: [
      "Collected and validated source layers in QGIS.",
      "Standardized projections and attribute fields.",
      "Designed map layouts for geology and field route context.",
      "Ran QA/QC checks before export for manuscript placement.",
    ],
    skillsDemonstrated: [
      "QGIS",
      "Cartography",
      "Projection Management",
      "QA/QC",
      "Academic Mapping",
    ],
    thumbnail: {
      src: "/projects/geological-map-metro-vancouver.jpeg",
      alt: "Geological map of Metro Vancouver study area",
      width: 720,
      height: 480,
    },
    heroImage: {
      src: "/projects/geological-map-metro-vancouver.jpeg",
      alt: "Detailed geology map layout used for faculty-led publication work",
      width: 1600,
      height: 1066,
    },
    fullResolution: {
      href: "/projects/geological-map-metro-vancouver.jpeg",
      label: "Download full-resolution geology map",
    },
  },
  {
    slug: "survey123-bear-sightings-workflow",
    title: "Survey123 Bear Sighting Workflow",
    summary:
      "Configured a wildlife reporting workflow connecting Survey123 submissions to ArcGIS Online web maps.",
    outcome:
      "Enabled faster reporting and map-based review of wildlife sightings for awareness and planning.",
    problem:
      "Wildlife observations were scattered across manual records with limited map visibility.",
    goal: "Create a simple reporting-to-map pipeline that updates reliably.",
    dataSources: [
      "Survey123 form submissions",
      "ArcGIS Online hosted feature layers",
      "Local reference basemaps and boundaries",
    ],
    workflow: [
      "Built Survey123 form schema and validation rules.",
      "Connected submissions to ArcGIS Online feature services.",
      "Configured symbols, popups, and category filters for quick review.",
      "Tested submission, sync, and QA checks across devices.",
    ],
    skillsDemonstrated: [
      "Survey123",
      "ArcGIS Online",
      "Web GIS",
      "Data Validation",
      "Spatial Reporting",
    ],
    thumbnail: {
      src: "/projects/study-area-location-map.jpeg",
      alt: "Wildlife reporting map preview",
      width: 720,
      height: 480,
    },
    heroImage: {
      src: "/projects/study-area-location-map.jpeg",
      alt: "Survey123 and ArcGIS Online wildlife reporting map workflow",
      width: 1600,
      height: 1066,
    },
  },
  {
    slug: "metro-vancouver-municipal-analysis-map",
    title: "Metro Vancouver Municipal Analysis Map",
    summary:
      "Mapped municipal boundaries and supporting layers to compare regional spatial patterns.",
    outcome:
      "Produced a readable regional map for quick policy and planning context discussions.",
    problem:
      "Project stakeholders needed a single view of municipal context across Metro Vancouver.",
    goal: "Build a clean regional base map with clear municipal delineation.",
    dataSources: ["Metro Vancouver open data", "BC administrative boundaries"],
    workflow: [
      "Prepared boundary layers and corrected attribute naming.",
      "Applied thematic styling for municipal comparison.",
      "Added cartographic elements for publication and slide use.",
    ],
    skillsDemonstrated: [
      "ArcGIS Pro",
      "QGIS",
      "Thematic Mapping",
      "Layout Design",
    ],
    thumbnail: {
      src: "/projects/metro-vancouver-municipalities.jpeg",
      alt: "Metro Vancouver municipalities thematic map",
      width: 720,
      height: 480,
    },
    heroImage: {
      src: "/projects/metro-vancouver-municipalities.jpeg",
      alt: "Municipal boundaries and labels in Metro Vancouver",
      width: 1600,
      height: 1066,
    },
  },
  {
    slug: "queen-elizabeth-route-cartography",
    title: "Queen Elizabeth Field Route Map",
    summary:
      "Designed a field route map to support geology-focused orientation and navigation.",
    outcome:
      "Improved route clarity for field trip planning and location communication.",
    problem:
      "Field materials needed a route map with clear landmarks and scale awareness.",
    goal: "Create a route-first map optimized for quick interpretation.",
    dataSources: ["OpenStreetMap basemap", "Field route linework", "Local reference layers"],
    workflow: [
      "Prepared route geometry and reference layers.",
      "Balanced label placement and visual hierarchy.",
      "Exported map variants for print and digital handouts.",
    ],
    skillsDemonstrated: [
      "Cartography",
      "Map Layout",
      "Field Mapping",
      "Visual Hierarchy",
    ],
    thumbnail: {
      src: "/projects/geology-route-queen-elizabeth.jpeg",
      alt: "Field trip route map in Queen Elizabeth area",
      width: 720,
      height: 480,
    },
    heroImage: {
      src: "/projects/geology-route-queen-elizabeth.jpeg",
      alt: "Route cartography for geology field trip support",
      width: 1600,
      height: 1066,
    },
  },
];

export const featuredProjects = projectCaseStudies.slice(0, 4);

export function getProjectBySlug(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}
