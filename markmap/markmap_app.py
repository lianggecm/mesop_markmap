import mesop as me
import mesop.labs as mel

from .markmap_component import (
  markmap_component,
)

@me.stateclass
class State:
  value: str = """
---
title: markmap
markmap:
  colorFreezeLevel: 1
---  
# Root
## Branch 1
### Leaf 1
### Leaf 2
## Branch 2
### Leaf 3
### Leaf 4"""

  height: str = "100vh"
  width: str="100%"


@me.page(
  path="/web_component1",
  security_policy=me.SecurityPolicy(allowed_script_srcs	= ["https://cdn.jsdelivr.net"],
                                    allowed_connect_srcs	= ["https://cdn.jsdelivr.net"],
                                    dangerously_disable_trusted_types=True)
)
def page():
    with me.box():
        markmap_component(
            value=me.state(State).value,
            width=me.state(State).width,
            height=me.state(State).height,
        )


