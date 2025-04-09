import { useRouter } from "vue-router";
// import { apiInfoProfile } from "/service/info";

const router = useRouter();

// export const checkerLogin = async (redirectTO = "/home") => {
//   //check token
//   if (localStorage.getItem("token")) {
//     const { success } = await apiInfoProfile();
//     //redirect page dashboard
//     if (success) {
//       router.push(redirectTO);
//     }
//   }
// };

export const checkerNotLogin = (redirectTO = "/login") => {
  //check token
  if (!localStorage.getItem("token")) {
    //redirect page dashboard
    router.push(redirectTO);
  }
};

export const formatNumberField = (number) => {
  if (typeof number == "number") {
    return number
      .toString()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return number.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

export const parseFormatNumberField = (number) => {
  if (number) {
    return parseFloat(number.replace(/\./g, "").replace(",", "."));
  } else {
    return 0;
  }
};

export const formatTerbilang = (number) => {
  const numberWords = [
    "",
    "Satu ",
    "Dua ",
    "Tiga ",
    "Empat ",
    "Lima ",
    "Enam ",
    "Tujuh ",
    "Delapan ",
    "Sembilan ",
    "Sepuluh ",
    "Sebelas ",
  ];

  if (number < 12) {
    return numberWords[number];
  } else if (number < 20) {
    return numberWords[number % 10] + "Belas ";
  } else if (number < 100) {
    return (
      numberWords[Math.floor(number / 10)] + "Puluh " + numberWords[number % 10]
    );
  } else if (number < 200) {
    return "Seratus " + formatTerbilang(number % 100);
  } else if (number < 1000) {
    return (
      numberWords[Math.floor(number / 100)] +
      "Ratus " +
      formatTerbilang(number % 100)
    );
  } else if (number < 2000) {
    return "Seribu " + formatTerbilang(number % 1000);
  } else if (number < 1000000) {
    return (
      formatTerbilang(Math.floor(number / 1000)) +
      "Ribu " +
      formatTerbilang(number % 1000)
    );
  } else if (number < 1000000000) {
    return (
      formatTerbilang(Math.floor(number / 1000000)) +
      "Juta " +
      formatTerbilang(number % 1000000)
    );
  } else {
    return "Angka terlalu besar";
  }
};

export const handleTokenExpired = (error) => {
  if (error.message == "Token is Expired") {
    localStorage.clear();
    router.push("/login");
  }
};

export const handleConnectionError = (error) => {
  if (error.message == "Network Error") {
    router.push("/error-page");
  }

  if (error.error == "connection") {
    router.push("/error-page");
  }

  if (error.response.data.error == "connection") {
    router.push("/error-page");
  }

  return;
};

export const formatNumber = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export const conjungtionParam = ($param) => {
  if ($param == "") {
    return "?";
  } else {
    return "&";
  }
};

export const base64toFile = (content, fileName, mimeType) => {
  // Mengonversi base64 ke array buffer
  const arrayBuffer = new Uint8Array(
    atob(content)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  // Mengonversi array buffer ke blob
  const blob = new Blob([arrayBuffer], { type: mimeType });

  // Membuat objek File dari blob
  const file = new File([blob], fileName, { type: mimeType });

  // Membuat objek DataTransfer
  const dataTransfer = new DataTransfer();

  // Menambahkan file ke objek DataTransfer
  dataTransfer.items.add(file);

  return dataTransfer.files;
};
