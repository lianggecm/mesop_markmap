import mesop.labs as mel


@mel.web_component(path="./markmap_component.js")
def markmap_component(
  *,
  value: str,
  width:str,
  height:str,
  key: str | None = None,
):
  return mel.insert_web_component(
    name="markmap-component",
    key=key,
    properties={
      "markdown": value,
      "width":width,
      "height":height,
    },
  )