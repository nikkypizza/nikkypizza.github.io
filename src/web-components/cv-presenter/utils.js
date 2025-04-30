const DefaultAttrs = {
  VIDEO: ['autoplay', 'muted', 'playsinline', 'loop'],
  IMG: (ctx) => {
    return {
      alt: ctx.getAttribute('text'),
      src: ctx.getAttribute('media'),
      loading: 'lazy',
    };
  },
};

const MediaFormat = {
  IMG: 'png',
  VIDEO: 'mp4',
};

const getMediaFormat = (ctx) => ctx.getAttribute('media').split('.').pop();

const generateImage = (ctx) => {
  const imgAttrs = DefaultAttrs.IMG(ctx);
  const imageNode = document.createElement('img');
  for (let attr in imgAttrs) imageNode[attr] = imgAttrs[attr];
  return imageNode;
};

const generateVideo = (ctx, parent) => {
  const videoNode = document.createElement('video');
  videoNode.dataset.src = ctx.getAttribute('media');
  DefaultAttrs.VIDEO.forEach(it => videoNode.setAttribute(it, ''));

  parent.addEventListener(
    'toggle', () => {
      videoNode.src = videoNode.dataset.src;
      delete videoNode.dataset.src;
    },
    { once: true }
  );
  return videoNode;
};

const generateMedia = (ctx, parent) => {
  parent.append(
    getMediaFormat(ctx) === MediaFormat.VIDEO ?
    generateVideo(ctx, parent) :
    generateImage(ctx));
};

const generatePreview = (ctx, parent) => {
  // Группы данных разделяются через '||' и дробятся внутри через '|'
  const previews = ctx.getAttribute('preview').split('||');

  previews.forEach((it, i) => {
    const [note, href, extraInfo] = it.split('|');
    const linkNode = document.createElement('a');
    const smallNode = document.createElement('small');

    linkNode.setAttribute('href', href);
    smallNode.textContent = note;

    linkNode.append(extraInfo ? `${extraInfo} ` : '', 'Смотреть превью ', smallNode);
    parent.append(linkNode, i < previews.length - 1 ? document.createElement('br') : '');
  })
}

export {
  generateMedia,
  generatePreview
}