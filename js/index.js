const getAllData = async (searchId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchId}`
  );
  const data = await res.json();
  const phoneData = data.data;
  displayPhoneData(phoneData);
};

const displayPhoneData = (phoneData) => {
  const phoneCard = document.getElementById("displayPhoneCard");
  phoneCard.textContent = "";

  //   display show more button
  const showMore = document.getElementById("show_more");
  if (phoneData.length > 9) {
    showMore.classList.remove("hidden");
  } else {
    showMore.classList.add("hidden");
  }

  //   display atleast 9 card
  phoneData = phoneData.slice(0, 9);

  phoneData.forEach((phoneData) => {
    const div = document.createElement("div");
    div.classList = `card bg-gray-100 shadow-xl pt-7`;
    div.innerHTML = `
    <figure>
    <img
      src="${phoneData.image}"
      alt="Phone"
    />
  </figure>
    <div class="card-body">
        <h2 class="text-2xl text-black text-center">${phoneData.phone_name}</h2>
        <div class="card-actions justify-center">
        <button onclick="showDetails('${phoneData.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
    phoneCard.appendChild(div);
  });
  loader(false);
};

// show details on click
const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const getSingleData = data.data;
  const phoneName = document.getElementById("phoneName");
  phoneName.innerText = getSingleData.name;
  show_detail_modal.showModal();
  const showDetails = document.getElementById("showw_detail_container");
  showDetails.innerHTML = `
  <img src="${getSingleData.image}" alt="" />
  `;
  console.log(getSingleData);
};

// impliment search
const getSearchValue = () => {
  loader(true);
  const searchValue = document.getElementById("searchField").value;
  getAllData(searchValue);
};

const loader = (isLoader) => {
  const loading = document.getElementById("loader");
  if (isLoader) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};
