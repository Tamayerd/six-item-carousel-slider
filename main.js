function fillCards(products) {
  var cardsContainer = document.getElementById("cardsContainer");

  products.forEach((product, index) => {
    var card = document.createElement("div");
    card.className = "product-card ";

    var cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    var cardFront = document.createElement("div");
    cardFront.className = "card-front";
    cardFront.style.backgroundImage = `url(${product.image})`;
    cardFront.style.backgroundSize = "cover";
    cardFront.style.backgroundPosition = "center";
    cardFront.style.backgroundRepeat = "no-repeat";
    cardFront.style.borderRadius = "6%";
    cardFront.style.backgroundColor = "white";

    var name = document.createElement("h3");
    name.innerText = product.name;
    cardFront.appendChild(name);
    name.style.textAlign = "center";

    var centerLine = document.createElement("div");
    centerLine.className = "center-line";

    var detailsButton = document.createElement("button");
    detailsButton.className = "detail-button";
    detailsButton.innerText = "Add To Basket";
    detailsButton.style.textAlign = "left";
    detailsButton.style.background = "#23272b";
    detailsButton.style.border = "none";
    detailsButton.style.color = "white";
    detailsButton.style.borderBottomLeftRadius = "6px";
    detailsButton.style.borderBottomRightRadius = "6px";
    detailsButton.style.bottom = "5px";
    detailsButton.style.width = "95%";
    detailsButton.style.left = "7px";
    detailsButton.style.height = "50px";
    detailsButton.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
    detailsButton.style.padding = "5px";
    detailsButton.id = "detailsButton";
    detailsButton.style.display = "flex";
    detailsButton.style.flexDirection = "row";
    detailsButton.style.alignItems = "center";
    detailsButton.style.justifyContent = "space-between";
    cardFront.appendChild(detailsButton);
    var svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("width", "50");
    svgIcon.setAttribute("height", "50");
    svgIcon.setAttribute("viewBox", "0 0 24 18");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
    );
    path.setAttribute("fill", "white");
    svgIcon.appendChild(path);
    detailsButton.appendChild(svgIcon);

    //PRODUCT DETAIL
    const details = document.querySelectorAll(".detail-button");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const support = urlParams.get("selected");

    if (support) {
      if (support != x) {
        showProductDetails(support);
      }
      x = support;
    }

    function showProductDetails(productName) {
      for (let i = 0; i < products.length; i++) {
        const element = products[i];

        if (element.name === productName) {
          var detailsContainer = document.getElementById("main-section");
          var container = document.getElementById("productDetailsContainer");

          detailsContainer.style.display = "none";

          var detailsWrapper = document.createElement("div");
          detailsWrapper.classList.add("details-wrapper");

          var flexContainer = document.createElement("div");
          flexContainer.style.display = "flex";

          var tableContainer = document.createElement("div");
          tableContainer.classList.add("table-container");

          var name = document.createElement("h2");
          name.classList.add("table-name");
          name.innerText = productName;

          var table = document.createElement("table");
          table.classList.add("table");
          table.style.backgroundColor = "transparent";
          var headers = [
            "Güç Kaynağı",
            "Akım Tüketimi",
            "Çalışma Sıcaklığı",
            "Akım Ölçüm Aralığı",
            "Yüksek Gerilim",
            "Ölçüm İletişim Türü",
            "Desteklenen CAN Hızı",
          ];

          var thead = document.createElement("thead");
          var headerRow = document.createElement("tr");

          thead.appendChild(headerRow);
          table.appendChild(thead);

          var tbody1 = document.createElement("tbody");
          var tbody2 = document.createElement("tbody");

          element.detail.forEach((detail, index) => {
            var row = document.createElement("tr");

            var headerCell = document.createElement("th");
            headerCell.scope = "row";
            headerCell.innerText = headers[index];
            row.appendChild(headerCell);

            var detailCell = document.createElement("td");
            detailCell.innerText = detail.trim();
            row.appendChild(detailCell);

            if (index % 2 === 0) {
              tbody1.appendChild(row);
            } else {
              tbody2.appendChild(row);
            }
          });

          table.appendChild(tbody1);
          table.appendChild(tbody2);
          tableContainer.appendChild(table);

          var descriptionTable = document.createElement("table");
          descriptionTable.classList.add("table");
          descriptionTable.style.backgroundColor = "transparent";
          descriptionTable.style.marginTop = "1.73%";

          var descriptionRow = document.createElement("tr");
          descriptionRow.style.display = "flex";
          descriptionRow.style.flexDirection = "column";
          descriptionRow.style.fontWeight = "bold";
          descriptionRow.style.color = "black";
          var descriptionHeaderCell = document.createElement("td");
          descriptionHeaderCell.scope = "row";
          descriptionHeaderCell.innerText = "Açıklama";
          descriptionRow.appendChild(descriptionHeaderCell);

          var descriptionCell = document.createElement("td");
          descriptionCell.colSpan = headers.length - 2;

          var descriptionLines = element.description
            .split("*")
            .map((line) => line.trim());
          descriptionLines.forEach((line) => {
            var p = document.createElement("p");
            p.innerText = line;
            descriptionCell.appendChild(p);
          });

          var toggleButton = document.createElement("button");
          toggleButton.innerText = "Açıklamayı Kısalt";
          toggleButton.style.marginTop = "10px";
          toggleButton.style.marginBottom = "50px";
          toggleButton.style.border = "none";
          toggleButton.style.backgroundColor = "grey";
          toggleButton.style.borderRadius = "10px";
          toggleButton.style.color = "white";

          toggleButton.addEventListener("click", function () {
            if (descriptionCell.classList.contains("shortened")) {
              descriptionCell.classList.remove("shortened");
              toggleButton.innerText = "Açıklamayı Kısalt";
            } else {
              descriptionCell.classList.add("shortened");
              toggleButton.innerText = "Açıklamayı Genişlet";
            }
          });

          descriptionRow.appendChild(descriptionCell);
          descriptionCell.appendChild(toggleButton);
          descriptionTable.appendChild(descriptionRow);

          var imageContainer = document.createElement("div");
          imageContainer.classList.add("image-container");
          descriptionCell.classList.add("shortened");
          var image = document.createElement("img");
          image.style.backgroundColor = "white";
          image.src = element.image;
          image.alt = "Product Image";

          //LIGHT-BOX
          var overlay = document.createElement("div");
          overlay.classList.add("overlay");

          overlay.addEventListener("click", closeLightbox);
          var lightbox = document.createElement("div");
          lightbox.classList.add("lightbox");
          lightbox.appendChild(image);
          document.body.appendChild(overlay);
          function openLightbox() {
            overlay.style.display = "block";
            var lightboxImage = document.createElement("img");
            lightboxImage.src = element.image;
            overlay.appendChild(lightboxImage);
          }
          function closeLightbox() {
            overlay.style.display = "none";
            image.style.display = "flex";
            location.reload();
          }
          imageContainer.appendChild(image);
          imageContainer.style.display = "flex";
          image.addEventListener("click", openLightbox);

          var div = document.createElement("div");
          div.style.width = "auto";
          div.style.height = "250px";
          container.appendChild(div);
          container.appendChild(name);
          flexContainer.appendChild(tableContainer);
          flexContainer.appendChild(descriptionTable);
          detailsWrapper.appendChild(imageContainer);
          detailsWrapper.appendChild(flexContainer);

          container.appendChild(detailsWrapper);

          break;
        }
      }
    }

    details.forEach((detail, index) => {
      detail.addEventListener("click", function () {
        const clickedProductName = products[index].name;

        window.location.href = `/products.html?selected=${clickedProductName}`;
        showProductDetails(clickedProductName);
      });
    });

    var bottomText = document.createElement("div");
    bottomText.style.textAlign = "center";
    bottomText.style.marginTop = "60%";
    bottomText.style.color = "black";

    cardInner.appendChild(cardFront);

    card.appendChild(cardInner);
    card.setAttribute("data-index", index);

    cardsContainer.appendChild(card);
  });
}

let products = [
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
  {
    name: "IM-Tracker 1",
    description:
      "- Çok çeşitli hafif kara, hava ve elektrikli araçlar, kamyonlar, otobüsler ve özel makineler için tasarlanmıştır.*- IM TRACKER GSM/GNSS/Bluetooth, CAN ve yüksek yan güç çıkışları gibi çeşitli özelliklere sahiptir.*- IM-TRACKER yakıt seviyesi (gösterge paneli), toplam yakıt tüketimi, araç hızı (tekerlek), aracın sürüş mesafesi, motor devri (rpm), gaz pedalı konumu gibi önemli verileri toplayabilir.",
    image: "./example.jpg",
    detail: [
      "1119-30 VDC",
      "Jiroskop ve İvme Ölçer (ops.)",
      "-40 °C ila +85 °C",
      "121 mA(12V),63 mA (24V",
      "2xCAN",
      "CAN 2.0A/B11 bit ve 29 bit IDS",
      "CAN veya Uyandırma girişleri",
    ],
  },
];
