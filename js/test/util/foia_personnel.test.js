import { expect } from 'chai';

import foiaPersonnel from '../../util/foia_personnel';

describe('foia_personnel', () => {
  describe('personnel()', () => {
    describe('given an empty list of members', () => {
      let agencyComponent;
      beforeEach(() => {
        agencyComponent = {};
      });

      it('returns an empty array', () => {
        expect(foiaPersonnel.personnel(agencyComponent, 'service_centers')).to.deep.equal([]);
      });
    });

    describe('given personnel without titles', () => {
      let agencyComponent;
      beforeEach(() => {
        agencyComponent = {
          service_centers: [{ name: 'John' }],
          public_liaisons: [{ name: 'Cindy' }],
          field_misc: [{ name: 'Bob' }],
          foia_officers: [{ name: 'Sarah' }],
        };
      });

      it('sets title for service_centers', () => {
        const person = foiaPersonnel.personnel(agencyComponent, 'service_centers')[0];
        expect(person).to.deep.equal({ name: 'John', title: 'FOIA Requester Service Center' });
      });

      it('sets title for public_liaisons', () => {
        const person = foiaPersonnel.personnel(agencyComponent, 'public_liaisons')[0];
        expect(person).to.deep.equal({ name: 'Cindy', title: 'FOIA Public Liaison' });
      });

      it('sets title for foia_officers', () => {
        const person = foiaPersonnel.personnel(agencyComponent, 'foia_officers')[0];
        expect(person).to.deep.equal({ name: 'Sarah', title: 'FOIA Officer' });
      });

      it('sets empty title for field_misc', () => {
        const person = foiaPersonnel.personnel(agencyComponent, 'field_misc')[0];
        expect(person).to.deep.equal({ name: 'Bob', title: '' });
      });
    });

    describe('given personnel with null title', () => {
      let agencyComponent;
      beforeEach(() => {
        agencyComponent = {
          service_centers: [{ name: 'John', title: null }],
        };
      });

      it('sets title for service_centers', () => {
        const person = foiaPersonnel.personnel(agencyComponent, 'service_centers')[0];
        expect(person).to.deep.equal({ name: 'John', title: 'FOIA Requester Service Center' });
      });
    });
  });
});
