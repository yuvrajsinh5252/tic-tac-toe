import os
from rich.console import Console

console = Console()
print = console.print


def is_win():
    for i in range(3):
        if squares[i][0] == squares[i][1] and squares[i][2] == squares[i][1]:
            print(f"\n[bold blue]Player {(squares[i][0] == 'X') + 1} has won[/]\n")
            return True
        if squares[0][i] == squares[1][i] and squares[2][i] == squares[1][i]:
            print(f"\n[bold blue]Player {(squares[0][i] == 'X') + 1} has won[/]\n")
            return True

    if (squares[0][0] == 'X' and squares[1][1] == 'X' and squares[2][2] == 'X'):
        print("\n[bold blue]Player 2 has won[/]\n")
        return True
    if (squares[0][0] == 'O' and squares[1][1] == 'O' and squares[2][2] == 'O'):
        print("\n[bold blue]Player 1 has won[/]\n")
        return True


def clear():
    if (os.name == "posix"):
        os.system("clear")
    else:
        os.system("cls")


squares = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]


def game_board():
    for i in range(3):
        for j in range(3):
            print(
                f" [bold {'green' if squares[i][j] == 'O' else 'red' if squares[i][j] == 'X' else ''}]{squares[i][j]}[/] ",
                end="|" if j < 2 else ""
            )
        print()
        if (i < 2):
            print('-----------------')


game_board()

k = 9
while k:
    temp = 0
    if (k != 0):
        if (k % 2 == 0):
            a = int(input("\nPlayer 2 -> pick a square :"))
        else:
            a = int(input("\nPlayer 1 -> pick a square :"))
        for i in range(3):
            for j in range(3):
                if (squares[i][j] == a and k % 2 == 0):
                    squares[i][j] = 'X'
                    temp = 1
                    break
                elif (squares[i][j] == a and k % 2 != 0):
                    squares[i][j] = 'O'
                    temp = 1
                    break
            if (temp == 1):
                break

        if is_win():
            clear()
            game_board()
            is_win()
            break
        if (temp != 1):
            k += 1
            print("\n[bold red]!!You selected a pre-occupied square!![/]")
            print("[bold red] ------Select a different square------[/]\n")
    if (temp == 1):
        clear()
        game_board()
    k -= 1

if (k == 0):
    if not is_win():
        print("[bold white]\n----------TIE----------[/]")
        print("[bold blue]!No one wins the match![/]\n")