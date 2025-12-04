{
    "options": {
        "spawned_item.id": {
            "type": "i8",
            "val": "8"
        },
    },
    "binhacks": {
        "spawn_item_on_bullet_graze.jmp": {
            "addr": 0x406514,
            "expected": "E8 [0x43DD10]",
            "code": "E9 [codecave:spawn_item_on_bullet_graze.cave]"
        },
    },
    "codecaves": {
        "spawn_item_on_bullet_graze.cave": {
            "access": "re",
            "code": "\
                E8 [0x43DD10] \
                A1 <0x477818> \
                8D8D B4030000 \
                68 9A99193F \
                68 DB0FC9BF \
                6A FF \
                6A <option:spawned_item.id> \
                E8 [0x41BB00] \
                E9 [0x406519] \
                "
            /*
                CALL 0x43DD10 ;code that was replaced in binhack
                MOV EAX,DWORD PTR [ITEM_MANAGER_PTR]
                LEA ECX,[EBP+3B4]                   ;arg5 (ECX) = spawned item position, [EBP+3B4] = bullet position
                PUSH 0.6                            ;arg4 = initial speed
                PUSH -1.5707963                     ;arg3 = initial angle
                PUSH -1                             ;arg2 = color
                PUSH <option:spawned_item.id>       ;arg1 = item ID
                CALL ItemManager::spawn_item
                JMP 0x406519 ;jump back to the place we came from
            */
        },
    },
}
