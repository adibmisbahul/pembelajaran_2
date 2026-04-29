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
      title: "DASAR DASAR KORESPONDENSI",
      image: iconComputer,
      bgColor: "pink",
      link: "https://youtu.be/iIGsgerROxA?si=pwTbK4O0P1Mk1cj-",
    },
    {
      id: 2,
      title: "JENIS² SURAT",
      image: prosAndCons,
      bgColor: "#8e51ff",
      link: "https://youtu.be/dXrsrwHZDxE?si=23EfT2dj-gn_IKgG",
    },
    {
      id: 3,
      title: "BAGIAN/STRUKRUR SURAT + CONTOH",
      image: stickyNotes,
      bgColor: "#05df72",
      link: " https://youtu.be/iCmrsdJ58b8?si=iQAdtE649poYVbT4",
    },
    {
      id: 4,
      title: "BENTUK/STYLE SURAT",
      image: uiDesign,
      bgColor: "#7ccf00",
      link: "https://youtu.be/Fp2-BErIlGs?si=UKudWcYF_-WuscBB",
    },
    {
      id: 5,
      title: "DEFINISI + FYNGSI SURAT NIAGA",
      image: iconComputer,
      bgColor: "#0084d1",
      link: "https://youtu.be/8O1_P0PR5LY?si=eY2Sxc1nf4N4sHeK",
    },
    {
      id: 6,
      title: "JENIS JENIS SURAT NIAGA + ISINYA ",
      image: calculator,
      bgColor: "#4a5565",
      link: " https://youtu.be/5Y1fCsuCYWw?si=s8jCotEAMg7Zg3la",
    },
    {
      id: 7,
      title: "TUTOR MENULIS SURAT NIAGA DI WORD",
      image: folderIcon,
      bgColor: "#f54900",
      link: "https://youtu.be/wE2fJ5yjcDk?si=jCPa6y9Pm9gjYfHV",
    },
    {
      id: 8,
      title: "PENULISAN SURAT NIAGA YG EFEKTIF",
      image: pencil,
      bgColor: "#372aac",
      link: "https://youtu.be/gaakNYoWUX8?si=6PnV24uYVb044SfO",
    },
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
                link={item.link}
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
