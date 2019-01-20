export const _displayPrice = price => {
  return Number.parseFloat(price).toFixed(2) + "$";
};

export const truncate = (str, length, ending) => {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

export const blob2Image = blobData => {
  const fileReaderInstance = new FileReader();
  fileReaderInstance.readAsDataURL(blobData);
  fileReaderInstance.onload = () => {
    const base64data = fileReaderInstance.result;
    return base64data;
  };
};
