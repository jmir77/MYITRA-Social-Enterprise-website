import { img } from "./site";
import type { Shot } from "@/components/fx/lightbox";

/* Every real photo, with neutral alt text describing only what is visible. No partner organisations named. */
const p = (f: string, alt: string, label?: string): Shot => ({ src: img(f), alt, label });

export const PHOTOS = {
  tunas: p("tunas-accreditation.jpg", "Award recipients on stage at an accreditation ceremony, holding certificates and plaques"),
  centreLaunch: p("community-centre-launch.jpg", "Guests stand beside a plaque being unveiled between red curtains at the official opening of the 21st Century Learning Cube, PPR Lembah Subang 2"),
  centreTeam: p("community-centre-team.jpg", "Facilitators and student volunteers standing with stacks of packed Kotak Cantik boxes at the community centre"),
  room7: p("corporate-office-room7.jpg", "The door of Room 7, \"The Changemakers\", at INTI International College Subang"),
  openingCeremony: p("opening-ceremony-learning-cube.jpg", "Guests standing beside a plaque being unveiled between red curtains at an official opening ceremony"),
  h2018July: p("history-2018-july-distribution.jpg", "Children, women and volunteers in a community hall holding up clear hygiene boxes, with orange crates in front", "July 2018"),
  h2018Hall: p("history-2018-hall.jpg", "Volunteers sorting hygiene boxes from orange crates in a community hall while families wait in rows of chairs", "July 2018"),
  h2018NovLaunch: p("history-2018-november-launch.jpg", "Guests on stage holding hygiene boxes in front of an INTI International College Subang banner, with orange crates beside them", "November 2018"),
  h2018NovOfficials: p("history-2018-november-officials.jpg", "Six women organisers smiling together beside stacked crates and boxes", "November 2018"),
  h2018Boxes: p("history-2018-boxes.jpg", "Wrapped hygiene packs stacked on a table labelled Perempuan, with orange crates below", "2018"),
  workshopCentre: p("workshop-community-centre.jpg", "Women taking part in an entrepreneurship workshop at the community centre"),
  workshopStudents: p("workshop-with-students.jpg", "Women and student volunteers working together during a workshop"),
  hygieneSession: p("hygiene-awareness-session.jpg", "Women attending a hygiene awareness session"),
  packingCentre: p("packing-at-centre.jpg", "Women and volunteers packing Kotak Cantik boxes at the community centre"),
  studentsBoxes: p("students-and-boxes.jpg", "Student volunteers with packed Kotak Cantik boxes"),
  womenWithBoxes: p("women-entrepreneurs-with-boxes.jpg", "Women social entrepreneurs holding Kotak Cantik boxes"),
  volunteersWomen: p("volunteers-with-women.jpg", "Student volunteers together with women from the community"),
  volunteersPacking: p("volunteers-packing-boxes.jpg", "Young volunteers stacking many packed Kotak Cantik boxes in a room with a painted mural"),
  facilitatorBox: p("facilitator-showing-box.jpg", "A facilitator at the front of a room shows an open Kotak Cantik box to a seated group of women, seen mostly from behind"),
  boxContents: p("kotak-cantik-box-contents.jpg", "An open Kotak Cantik box with blue-wrapped pads in a row, bamboo toothbrush packs, a soap bar, a pocket tissue pack and a face mask pack"),
  packingGuide: p("kotak-cantik-packing-guide.jpg", "Illustrated packing layout guide for the Kotak Cantik box with top, lid-open and side views", "Packing layout guide"),
  womenHoldingBoxes: p("women-with-kotak-cantik-boxes.jpg", "Community members and a facilitator smiling as they hold Kotak Cantik boxes in a community hall"),
  training: p("training-session.jpg", "A MYITRA facilitator leads a training session for women seated in a community centre"),
};
