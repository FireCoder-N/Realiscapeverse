
%% DATAVIEW_PUBLISHER: start
```dataview
TABLE join(file.tags, " ") as Tags
FROM "20 - Atlas/Dnd/Realiscapeverse/Η Marrow/05-Folklore"
WHERE !contains(file.path, this.file.path)
```
%%

| File                                                                                              | Tags        |
| ------------------------------------------------------------------------------------------------- | ----------- |
| [[20 - Atlas/Dnd/Realiscapeverse/Η Marrow/05-Folklore/Τα δάκρυα των Θεών.md\|Τα δάκρυα των Θεών]] | #lore #myth |

%% DATAVIEW_PUBLISHER: end %%