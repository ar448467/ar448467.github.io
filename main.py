from bs4 import BeautifulSoup
import requests
import markdown
import markdownify
from mdutils.mdutils import MdUtils
from mdutils import Html
from googlesearch import search

def markdowning():
    mdAcme = MdUtils(file_name='aww1')
    mdAcme.new_paragraph('AWWW - zadanie nr 1',bold_italics_code='bi', align='center')
    mdAcme.new_header(level=1, title='Otwarcia Szachowe')
    mdAcme.new_paragraph(
        'Witaj na stronie internetowej, która powstała na pierwszym laboratorium z AWWW 23/24 na UW\n')
    mdAcme.new_paragraph(
        'Ta strona jest poświęcona otwarciom szachowym\n')
    mdAcme.new_paragraph("``Link do listy otwarć szachowych: "
                         "``[lista](https://ar448467.github.io/second1.html).\n")
    mdAcme.create_md_file()


def hlp(a, booll):
    ret = str(a)[4: len(a) - 6]
    if(booll == True):
        return ret
    retu = ""
    for a in ret:
        if a != " ":
            retu += a
        elif booll == -1:
            retu += '-'
    return retu


def html_to_markdown2(url):
    page = requests.get(url)
    cont = page.content
    soup = BeautifulSoup(cont, 'html.parser')
    my_list = []
    my_img = []
    h = 'height="200" '
    w = 'width="200" '
    # print(soup.find_all('a'))
    pref = '<a href = https://ar448467.github.io/'
    end = '</a>'
    ret = ""
    for a in soup.find_all('h5'):
        ret = str(a)[0:4]
        my_op = hlp(a, False)
        ret += pref + my_op + '.html>' + hlp(a, True) + end + '</h5>'
        my_list.append(ret)
    ret = ""
    for a in soup.find_all('img'):
        ret = str(a)[0:5]
        ret += h
        ret += w
        ret += str(a)[5:len(a) - 1]
        ret += '>'
        my_img.append(ret)
    my_html = ""
    f = open('second.html', 'w')
    for i in range(0, len(my_list)):
        #my_html += str(my_img[i])
        my_html += str(my_list[i])
        f.write(str(my_img[i + 5]))
        f.write(str(my_list[i]))
    h = markdownify.markdownify(my_html, heading_style="ATX")
    #print(h)
    f.close()


def markdown_to_html():
    # Open the file for reading and read the input to a temp variable
    with open('aw1w1.md', 'r') as f:
        tempMd = f.read()

    # Convert the input to HTML
    tempHtml = markdown.markdown(tempMd)
    # If necessary, could print or edit the results at this point.
    # Open the HTML file and write the output.
    with open('aw1w1.html', 'w') as f:
        f.write(tempHtml)


'''
def creating_last_files(url1):
    it = 0
    page = requests.get(url1)
    cont = page.content
    soup = BeautifulSoup(cont, 'html.parser')
    for a in soup.find_all('h5'):
        my_search = hlp(a, True)
        it += 1
        if it > 5:
            break
        for url in search('Adela', stop=1):
            p = requests.get(url)
            c = p.content
            soup = BeautifulSoup(c, 'html.parser')
            name = str(hlp(a, False))
            name += '.html'
            f = open(name, 'w')
            for s in soup.find_all('a'):
                print(s)
                try:
                    pass
                    # f.write(str(s))
                except:
                    pass
            f.close()
'''
def list_in_markdown(url1):
    mdAcme = MdUtils(file_name='second1')
    #f.write("We just updated our [Docs Contribution Guide](https://www.codecademy.com/pages/contribute-docs)!")
    page = requests.get(url)
    cont = page.content
    soup = BeautifulSoup(cont, 'html.parser')
    mdAcme.new_header(level=1, title='Lista otwarć szachowych')
    my_list = []
    my_link = []
    my_img = []
    it = 0
    for a in soup.find_all('h5'):
        it += 1
        my_op = hlp(a, True)
        my_op2 = hlp(a, False)
        my_list.append(my_op)
        my_link.append('https://ar448467.github.io/' + str(my_op2) + '.html')
    for a in soup.find_all('img'):
        my_img.append(str(a)[10:len(a) - 3])
    for i in range(0, len(my_list)):
        path = my_img[i + 5]
        mdAcme.new_paragraph(Html.image(path=path, size='200x200', align='left'))
        mdAcme.new_paragraph('[' + str(my_list[i]) + '](' + my_link[i] + ')')
    mdAcme.create_md_file()


def creating_last_files2(url1):
    page = requests.get(url1)
    cont = page.content
    soup = BeautifulSoup(cont, 'html.parser')
    for a in soup.find_all('h5'):
        my_search = hlp(a, True)
        url = url1 + str(hlp(a, -1))
        p = requests.get(url)
        c = p.content
        soup = BeautifulSoup(c, 'html.parser')
        name = str(hlp(a, False))
        name += '.html'
        f = open(name, 'w')
        for a1 in soup.find_all('p'):
            try:
                f.write(str(a1))
            except:
                print(my_search)
        f.close()


url = 'https://www.thechesswebsite.com/chess-openings/'
# loading2(url)
#markdowning()
#html_to_markdown2(url)
# markdown_to_html()
# creating_last_files2(url)
list_in_markdown(url)