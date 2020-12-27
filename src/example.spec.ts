class FriendsList {
  friends: string[] = [];

  addFriend(name: string) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend`);
  }

  removeFrined(name) {
    const inx = this.friends.indexOf(name);
    if (inx === -1) {
      throw new Error('Frineds not found');
    }
    this.friends.splice(inx, 1);
  }
}

describe('Friends list', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Slava');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friend ship', () => {
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Slava');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Slava');
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Slava');
      expect(friendsList.friends[0]).toEqual('Slava');
      friendsList.removeFrined('Slava');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throws new error as friend dos not exist', () => {
      expect(() => friendsList.removeFrined('Slava')).toThrow(
        new Error('Frineds not found'),
      );
    });
  });
});
