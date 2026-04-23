import "./dashboard.css";
import { useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import iconComputer from "../assets/computer.png";
import prosAndCons from "../assets/pros-and-cons.png";
import stickyNotes from "../assets/sticky-notes.png";
import uiDesign from "../assets/ui-design.png";
import pencil from "../assets/pencil.png";
import folderIcon from "../assets/folder.png";
import calculator from "../assets/calculator.png";

const DashboardPage = () => {
  const navigate = useNavigate();

  function handleRouteAddSurat() {
    navigate("./generate-surat");
  }

  const [dataMateri, setDataMateri] = useState([
    {
      id: 1,
      title: "Jenis-Jenis Surat bisnis",
      image: iconComputer,
      bgColor: "pink",
    },
    {
      id: 2,
      title: "Pengertian & Fungsi Surat Bisnis",
      image: prosAndCons,
      bgColor: "#8e51ff",
    },
    {
      id: 3,
      title: "Struktur Surat Resmi",
      image: stickyNotes,
      bgColor: "#05df72",
    },
    {
      id: 4,
      title: " Bahasa & Etika Penulisan",
      image: uiDesign,
      bgColor: "#7ccf00",
    },
    {
      id: 5,
      title: "Surat Digital (Modern)",
      image: iconComputer,
      bgColor: "#0084d1",
    },
    {
      id: 6,
      title: "Format & Standar Surat",
      image: calculator,
      bgColor: "#4a5565",
    },
    { id: 1, title: "surat", image: folderIcon, bgColor: "#f54900" },
    { id: 1, title: "surat", image: pencil, bgColor: "#372aac" },
  ]);
  return (
    <>
      <div className="container-dashboard">
        <div className="box-materi">
          {dataMateri.map((item) => {
            return (
              <Card
                title={item.title}
                image={item.image}
                bgColor={item.bgColor}
              />
            );
          })}
        </div>
        <button className="btn-create-surat" onClick={handleRouteAddSurat}>
          + surat
        </button>
      </div>
    </>
  );
};

export default DashboardPage;
