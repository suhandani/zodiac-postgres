"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState(0);
  const [bulan, setBulan] = useState(0);
  const [tahun, setTahun] = useState(0);
  const [visible, setVisible] = useState(false);
  const [zodiak, setZodiak] = useState("");
  const today = new Date();

  const handleChangeNama = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNama(e.target.value);
  };
  const handleChangeTanggal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTanggal(+e.target.value);
  };
  const handleChangeBulan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulan(+e.target.value);
  };
  const handleChangeTahun = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTahun(+e.target.value);
  };

  const birthdate = new Date(tahun, bulan - 1, tanggal);
  const ageInMilliseconds = today.getTime() - birthdate.getTime();
  let ageInYears = Math.floor(
    ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );

  let ageMonths = today.getMonth() - birthdate.getMonth();
  let ageDays = today.getDate() - birthdate.getDate();

  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageInYears;
    ageMonths += 12;
  } else if (ageDays < 0) {
    ageDays = today.getDate();
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const re = /^[a-zA-Z]*$/;
    if (re.test(nama) == false || nama == "") {
      alert("Name Can't Empty & use Special Character");
    } else if (tanggal == 0) {
      alert("Tanggal Can't Empty");
    } else if (bulan == 0) {
      alert("Bulan Can't Empty");
    } else if (tahun == 0) {
      alert("Tahun Can't Empty");
    } else {
      const zodiak = await axios
        .get(`http://localhost:3000/api/get`, {
          params: {
            date: new Date(1900, bulan - 1, tanggal),
          },
        })
        .then((res) => res.data);
      console.log(zodiak);
      setZodiak(zodiak);
      setVisible(true);
    }
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex py-3 self-center">
            <div className="p-2.5">Nama : </div>
            <div>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nama"
                onChange={handleChangeNama}
              ></input>
            </div>
          </div>
          <div className="flex py-3 self-center">
            <div className="p-2.5">Tanggal Lahir : </div>
            <div>
              <input
                type="text"
                id="tanggal"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tanggal"
                onChange={handleChangeTanggal}
              ></input>{" "}
              /{" "}
              <input
                type="text"
                id="bulan"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bulan"
                onChange={handleChangeBulan}
              ></input>{" "}
              /{" "}
              <input
                type="text"
                id="tahun"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tahun"
                onChange={handleChangeTahun}
              ></input>
            </div>
          </div>
          <div className="flex py-3 self-center">
            <button
              className="bg-black text-white p-2.5 rounded-md text-s"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {visible == true && (
            <div className="flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
              <div id="print" className="flex flex-col self-center py-10">
                <div className="bg-white py-8 px-14 flex flex-col rounded-xl z-20">
                  <div className="my-4 flex flex-col">
                    <div>Hallo {nama},</div>
                    <div>Usia anda Saat ini adalah :</div>
                    <div>{ageInYears} Tahun,</div>
                    <div>{ageMonths} Bulan,</div>
                    <div>{ageDays} Hari,</div>
                    <div>Bintang anda adalah</div>
                    <div>{zodiak}</div>
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-md text-s m-4"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
