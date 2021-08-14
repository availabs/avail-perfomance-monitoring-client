# avl-starter

Template for AVAIL apps.

## Submodules

From [How To Add and Update Git Submodules](https://devconnected.com/how-to-add-and-update-git-submodules/)

### Adding

Example: Adding the avl-graph component submodule.

```sh
git submodule add https://github.com/availabs/avl-graph.git src/components/avl-graph
```

After adding a submodule, commit the changes.

```sh
git commit -m "Added avl-graph submodule."
```

### Updating

```sh
git submodule update --init --recursive
```
